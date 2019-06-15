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
import {MoneyDashboardNew} from '../../_models/money/money-dashboard-new';
import {MoneyMonths} from '../../_models/money/money-months';
import {MoneyCategories} from '../../_models/money/money-categories';
import {MoneyDicCategories} from '../../_models/money/money-dic-categories';
import {MoneyDashboard} from '../../_models/money/money-dashboard';
import {ResponseServer} from '../../_models/response-server';


@Injectable()
export class MoneyDashboardService {

  private moneyDashboardUrl = 'pr/getMoneyDashboard';
  private moneyDashboardTestUrl = 'pr/getMoneyDashboardTest';
  private moneyCreateDashboardUrl = 'pr/createMoneyDashboard';
  private moneyCreateCategorydUrl = 'pr/createCategoryDashboard';
  private moneyUpdateMoneyDashboardUrl = 'pr/updateMoneyDashboard';
  private moneyUpdateMoneyCategoryUrl = 'pr/updateMoneyCategory';
  private moneyMonthsCopyUrl = 'pr/getMoneyMonthsCopy';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {

  }

  getUserDashboard(currentMonth: MoneyMonths): Observable<MoneyDashboard> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<MoneyDashboard>(this.moneyDashboardUrl, currentMonth, httpOpt);
  }

  createDashboard(newDashboard: MoneyDashboardNew): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.moneyCreateDashboardUrl, newDashboard, httpOpt);
  }

  createCategory(cat: MoneyAddCategory): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.moneyCreateCategorydUrl, cat, httpOpt);
  }

  updateMonthDashboard(moneyDashboard: MoneyDashboard): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.moneyUpdateMoneyDashboardUrl, moneyDashboard, httpOpt);
  }

  updateMonthCategory(moneyCategory: MoneyCategories): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.moneyUpdateMoneyCategoryUrl, moneyCategory, httpOpt);
  }

  getMoneyMonthsCopy(currentMonth: MoneyMonths): Observable<MoneyMonths[]> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<MoneyMonths[]>(this.moneyMonthsCopyUrl, currentMonth, httpOpt);
  }

  getDateFromString(stringDate: string) {

    const parts = stringDate.split('/');

    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  }

}