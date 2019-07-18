import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {SessionUser} from '../../_models/index';
import {UserProfile} from '../../_models/index';
import {MoneyAddCategory} from '../../_models/money/money-add-category';
import {Role} from '../../_models/index';
import {AuthenticationService} from '../../_services/index';
import {MoneyMonths} from '../../_models/money/money-months';
import {MoneyCategories} from '../../_models/money/money-categories';
import {MoneyDicCategories} from '../../_models/money/money-dic-categories';
import {MoneyDashboard} from '../../_models/money/money-dashboard';
import {ResponseServer} from '../../_models/response-server';

import {ChartsPie} from '../../_models/charts/charts-pie';
import {ChartsDatas} from '../../_models/charts/charts-datas';


@Injectable()
export class MoneyChartsService {

  private moneyPieChartsCategoryUrl = 'pr/getMoneyPieChartsCategory';
  private moneyBarChartsCategoryUrl = 'pr/getMoneyBarChartsCategory';
  private moneyBarChartsEUUrl = 'pr/getMoneyBarChartsEU';
  private moneyBarChartsRisparmioUrl = 'pr/getMoneyBarChartsRisparmio';
  private moneyCreateDashboardUrl = 'pr/createMoneyDashboard';
  private moneyCreateCategorydUrl = 'pr/createCategoryDashboard';
  private moneyUpdateMoneyDashboardUrl = 'pr/updateMoneyDashboard';
  private moneyUpdateMoneyCategoryUrl = 'pr/updateMoneyCategory';
  private moneyListPeriodoUrl = 'pr/getMoneyListPeriodo';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {

  }

  getMoneyPieChartsCategory(currentMonth: MoneyMonths): Observable<ChartsPie> {
    return this.http.post<ChartsPie>(this.moneyPieChartsCategoryUrl, currentMonth);
  }

  getBarChartsCategory(currentCategory: MoneyDicCategories): Observable<ChartsPie> {
    return this.http.post<ChartsPie>(this.moneyBarChartsCategoryUrl, currentCategory);
  }

  getBarChartsEU(periodo: string): Observable<ChartsDatas> {
    return this.http.post<ChartsDatas>(this.moneyBarChartsEUUrl, periodo);
  }
    
  getBarChartsRisparmio(periodo: string): Observable<ChartsDatas> {
    return this.http.post<ChartsDatas>(this.moneyBarChartsRisparmioUrl, periodo);
  }

  getMoneyListPeriodo(): Observable<string[]> {
    return this.http.get<string[]>(this.moneyListPeriodoUrl);
  }

}
