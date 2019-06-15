import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../_services/index';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {InstaMedia} from '../../_models/instagram/insta-media';
import {InstaUser} from '../../_models/instagram/insta-user';
import {ChartsDatas} from '../../_models/charts/charts-datas';

@Injectable({
  providedIn: 'root'
})
export class InstaContentService {

  private getInstaLastMediaUrl = 'pr/inst/getInstaLastMedia/';
  private getInstaTopTenUrl = 'pr/inst/getInstaTopTen/';

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) {}

  getInstaTopTen(metric: string): Observable<InstaUser> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.get<InstaUser>(this.getInstaTopTenUrl + metric, httpOpt);
  }

  getInstaLastMedia(): Observable<InstaMedia> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.get<InstaMedia>(this.getInstaLastMediaUrl, httpOpt);
  }
}
