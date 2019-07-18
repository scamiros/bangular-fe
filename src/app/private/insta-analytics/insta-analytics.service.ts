import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../_services/index';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {InstaStatsself} from '../../_models/instagram/insta-statsself';
import {ChartsDatas} from '../../_models/charts/charts-datas';

@Injectable({
  providedIn: 'root'
})
export class InstaAnalyticsService {

  private getInstaSelfUrl = 'pr/inst/getInstaUserself/';
  private getInstaFolloersGroUrl = 'pr/inst/getInstaStats/';

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) {}

  getInstaUserself(period: string): Observable<InstaStatsself> {
    return this.http.get<InstaStatsself>(this.getInstaSelfUrl + period);
  }

  getInstaStats(metric: string, period: string): Observable<ChartsDatas> {
    return this.http.get<ChartsDatas>(this.getInstaFolloersGroUrl + metric + '/' + period);
  }
}
