import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { first, flatMap, map } from 'rxjs/operators';
import { User } from './../_models/user';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private store: Store<fromApp.AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth').pipe(
            first(),
            map(authState => {
                return authState.user;
            }),
            map(user => {
                const isAuth = !!user;
                if(!isAuth) {
                    return true;
                }

                this.router.navigate(['/pb/login'], { queryParams: { returnUrl: state.url }});
                return false;
            })
        );
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            var current = localStorage.getItem('currentUser');
            console.log("Current user: " + current);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/pb/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}