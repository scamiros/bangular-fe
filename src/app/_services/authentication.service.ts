import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { User } from '../_models';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  /* public token: string;
  public isAdmin = false; */

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
    // set token if saved in local storage
    //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string) {
    return this.http.post<User>('/pb/login', {username: username, password: password})
      .pipe(
          tap(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {

            const expDate = new Date(new Date().getTime() + 1800 * 1000);

            this.store.dispatch(
              new AuthActions.Login({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                token: user.token,
                expiration: expDate
            })
          );
          //localStorage.setItem('currentUser', JSON.stringify(user));
          /* if (authority === 'ROLE_ADMIN') {
            this.isAdmin = true;
          } */
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.store.dispatch(new AuthActions.Logout());
    //localStorage.removeItem('currentUser');
  }
}
