import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SessionUser } from '../_models/index';
import { UserProfile } from '../_models/index';
import { AuthenticationService } from '../_services/index';


@Injectable() 
export class PrivateService {

    private customersUrl = 'admin/getAdmin'; 
    private userProfileUrl = 'pr/getUserProfile'; // URL to web API

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getAdmin() : Observable<UserProfile> {  
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };    
        // add authorization header with jwt token
        //let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        //let options = new RequestOptions({ headers: headers });
        return this.http.get<UserProfile>(this.customersUrl, httpOpt);
           // .pipe(catchError(this.handleError));
    }
    
    getUserProfile() : Observable<UserProfile> {  
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };    
      
        return this.http.get<UserProfile>(this.userProfileUrl, httpOpt);
    }
    
    getMenu() : Observable<any> {  
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };    
       
        return this.http.get<any>("admin/getMenu", httpOpt);
           // .pipe(catchError(this.handleError));
    }
    
}    