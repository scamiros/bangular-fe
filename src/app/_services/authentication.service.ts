import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  public token: string;
  public isAdmin = false;

  constructor(private http: HttpClient) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string) {
    return this.http.post<any>('/pb/login', {username: username, password: password})
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          this.token = user.token;
          var authority = user.role;

          if (authority === 'ROLE_ADMIN') {
            this.isAdmin = true;
          }
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
