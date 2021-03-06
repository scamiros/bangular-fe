import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../_services/index';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {InstaSnap} from '../../_models/instagram/insta-snap';
import {InstaUser} from '../../_models/instagram/insta-user';
import {InstaMedia} from '../../_models/instagram/insta-media';

@Injectable({
  providedIn: 'root'
})
export class InstaProfileService {

  private getInstaSnapUrl = 'pr/inst/getInstaSnap';
  private getInstaProfileUrl = 'pr/inst/getInstaProfile';
  private getInstaMediaUrl = 'pr/inst/getInstaMedia/';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {}

  getInstaSnap(): Observable<InstaSnap> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.get<InstaSnap>(this.getInstaSnapUrl, httpOpt);
  }

  getInstaProfile(): Observable<InstaUser> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.get<InstaUser>(this.getInstaProfileUrl, httpOpt);
  }

  getInstaMedia(idMedia: string): Observable<InstaMedia> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.get<InstaMedia>(this.getInstaMediaUrl + idMedia, httpOpt);
  }
}
