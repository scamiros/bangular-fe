import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../_services/index';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ResponseServer} from '../../_models/response-server';
import {InstaPodGroup} from '../../_models/instagram/insta-pod-group';
import {InstaPodUser} from '../../_models/instagram/insta-pod-user';
import {InstaPodGroupBean} from '../../_models/instagram/insta-pod-group-bean';
import {InstaPodContent} from '../../_models/instagram/insta-pod-content';
import {InstaPodAction} from '../../_models/instagram/insta-pod-action';
import {InstaPodUserPage} from '../../_models/instagram/insta-pod-user-page';
import {SearchBean} from '../../_models/search-bean';

@Injectable({
  providedIn: 'root'
})
export class InstaPodUsersService {

    private getInstaPodUsersUrl = 'pr/instpod/getInstaPodUsers/';
    private getInstaPodUsersListUrl = 'pr/instpod/getInstaPodUsersList/';
    private postPodUserUrl = 'pr/instpod/postInstaPodUser';
    private deletePodUserUrl = 'pr/deletePodUser';

    constructor(private http: HttpClient,
        private authenticationService: AuthenticationService) {}

    getInstaPodUsers(search: SearchBean): Observable <InstaPodUserPage> {
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };
            
        return this.http.post<InstaPodUserPage>(this.getInstaPodUsersUrl, search, httpOpt);
    }
    
    getInstaPodUsersList(): Observable <InstaPodUser[]> {
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };
            
        return this.http.get<InstaPodUser[]>(this.getInstaPodUsersListUrl, httpOpt);
    }
    
    managePodUserService(podUser: InstaPodUser) : Observable<ResponseServer> {  
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };    
      
        return this.http.post<ResponseServer>(this.postPodUserUrl, podUser, httpOpt);
    }
    
    deletePodUser(podUser: InstaPodUser) : Observable<ResponseServer> {  
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };    
      
        return this.http.post<ResponseServer>(this.deletePodUserUrl, podUser, httpOpt);
    }
}
