import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../_services/index';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {ChartsDatas} from '../../_models/charts/charts-datas';
import {InstaPodGroup} from '../../_models/instagram/insta-pod-group';
import {InstaPodChartBean} from '../../_models/instagram/insta-pod-chart-bean';

@Injectable({
    providedIn: 'root'
})
export class InstaPodChartService {

    private getPodInstaStatsUrl = '/pr/instpod/getInstaPodStats';
    private getPodInstaStarsUrl = '/pr/instpod/getInstaPodStars';
    
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) { }

    getInstaPodStats(search: InstaPodChartBean): Observable<ChartsDatas> {
        return this.http.post<ChartsDatas>(this.getPodInstaStatsUrl, search);
    }
    
    getInstaPodStars(search: InstaPodChartBean): Observable<ChartsDatas> {
        return this.http.post<ChartsDatas>(this.getPodInstaStarsUrl, search);
    }
}
