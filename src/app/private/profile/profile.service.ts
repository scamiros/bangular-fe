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
export class ProfileService {

    private userProfileUrl = 'pr/getUserProfile';
    private userRoleUrl = 'pr/getRoleProfile';
    private userRolesUrl = 'pr/getRoles';
    private userProfileSaveUrl = 'pr/userProfileSave';

    
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
        
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
    
    getRoles() : Observable<Role[]> {  
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };    
      
        return this.http.get<Role[]>(this.userRolesUrl, httpOpt);
    }
    
    saveUser(user: UserProfile): Observable<UserProfile> {
        
         const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        }; 
        
        console.log("prima di invio");
        return this.http.post<UserProfile>(this.userProfileSaveUrl, user, httpOpt);
    }
}