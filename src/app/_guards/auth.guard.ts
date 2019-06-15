import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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