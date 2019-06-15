import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../_services/index';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ResponseServer} from '../../_models/response-server';
import {InstaPodGroup} from '../../_models/instagram/insta-pod-group';
import {InstaPodMember} from '../../_models/instagram/insta-pod-member';
import {InstaPodGroupBean} from '../../_models/instagram/insta-pod-group-bean';
import {InstaPodContent} from '../../_models/instagram/insta-pod-content';
import {InstaPodAction} from '../../_models/instagram/insta-pod-action';

@Injectable({
  providedIn: 'root'
})

export class InstaPodsService {

  private getInstaPodGroupsUrl = 'pr/instpod/getInstaPodGroups/';
  private createInstaPodMemberUrl = 'pr/instpod/createInstaPodMember/';
  private getInstaPodGroupUrl = 'pr/instpod/getInstaPodGroup/';
  private createInstaPodGroupUrl = 'pr/instpod/createInstaPodGroup/';
  private createInstaPodContentUrl = 'pr/instpod/createInstaPodContent/';
  private postInstaPodActionUrl = 'pr/instpod/postInstaPodAction/';
  private getInstaPodActionsUrl = 'pr/instpod/getInstaPodActions/';
  private removeInstaPodMemberUrl = 'pr/instpod/removeInstaPodMember/';

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) {}

  getInstaPodGroups(): Observable<InstaPodGroup[]> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.get<InstaPodGroup[]>(this.getInstaPodGroupsUrl, httpOpt);
  }

  getInstaPodGroup(group: InstaPodGroup): Observable<InstaPodGroupBean> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<InstaPodGroupBean>(this.getInstaPodGroupUrl, group, httpOpt);
  }

  createMember(t: InstaPodMember): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.createInstaPodMemberUrl, t, httpOpt);
  }
    
  removeMember(t: InstaPodMember): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.removeInstaPodMemberUrl, t, httpOpt);
  }

  postPodAction(t: InstaPodAction): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.postInstaPodActionUrl, t, httpOpt);
  }

  getPodActions(t: InstaPodContent): Observable<InstaPodAction[]> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<InstaPodAction[]>(this.getInstaPodActionsUrl, t, httpOpt);
  }

  createGroup(t: InstaPodGroup): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.createInstaPodGroupUrl, t, httpOpt);
  }

  createContent(t: InstaPodContent): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.createInstaPodContentUrl, t, httpOpt);
  }

}
