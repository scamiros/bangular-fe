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
    return this.http.get<InstaPodGroup[]>(this.getInstaPodGroupsUrl);
  }

  getInstaPodGroup(group: InstaPodGroup): Observable<InstaPodGroupBean> {
    return this.http.post<InstaPodGroupBean>(this.getInstaPodGroupUrl, group);
  }

  createMember(t: InstaPodMember): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(this.createInstaPodMemberUrl, t);
  }
    
  removeMember(t: InstaPodMember): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(this.removeInstaPodMemberUrl, t);
  }

  postPodAction(t: InstaPodAction): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(this.postInstaPodActionUrl, t);
  }

  getPodActions(t: InstaPodContent): Observable<InstaPodAction[]> {
    return this.http.post<InstaPodAction[]>(this.getInstaPodActionsUrl, t);
  }

  createGroup(t: InstaPodGroup): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(this.createInstaPodGroupUrl, t);
  }

  createContent(t: InstaPodContent): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(this.createInstaPodContentUrl, t);
  }

}
