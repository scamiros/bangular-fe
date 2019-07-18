import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SessionUser } from '../../_models/index';
import { UserProfile } from '../../_models/index';
import { Role } from '../../_models/index';
import { AuthenticationService } from '../../_services/index';


@Injectable() 
export class SecurityService {

    private userUpdatePasswordUrl = 'pr/updateUserPassword';
    
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
        
    }

    updateUserPassword(user: UserProfile): Observable<UserProfile> {
        
        console.log(user.username);
        console.log(user.password);
        return this.http.post<UserProfile>(this.userUpdatePasswordUrl, user);
    }
}