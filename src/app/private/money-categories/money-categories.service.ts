import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {SessionUser} from '../../_models/index';
import {UserProfile} from '../../_models/index';
import {Role} from '../../_models/index';
import {AuthenticationService} from '../../_services/index';

import {MoneyCategories} from '../../_models/money/money-categories';
import {MoneyTransactions} from '../../_models/money/money-transactions';
import {MoneyMonths} from '../../_models/money/money-months';
import {MoneyDicCategories} from '../../_models/money/money-dic-categories';
import {ResponseServer} from '../../_models/response-server';


@Injectable()
export class MoneyCategoriesService {

  private moneyMonthCategoriesUrl = 'pr/getDashboardCategories';
  private moneyCategoriesUrl = 'pr/getCategories';
  private moneyTransactionsUrl = 'pr/getTransactionList';
  private moneyMonthsUrl = 'pr/getMoneyMonths';
  private moneyMonthsTestUrl = 'pr/getMoneyMonthsTest';
  private moneyCreateTransactiondUrl = 'pr/createTransaction';
  private moneyDeleteCategoryUrl = 'pr/deleteCategory';
  private moneyDeleteTransactionUrl = 'pr/deleteTransaction';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {

  }

  getUserCategories(currentMonth: MoneyMonths): Observable<MoneyCategories[]> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<MoneyCategories[]>(this.moneyMonthCategoriesUrl, currentMonth, httpOpt);
  }

  getListCategories(): Observable<MoneyDicCategories[]> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.get<MoneyDicCategories[]>(this.moneyCategoriesUrl, httpOpt);
  }

  getMoneyMonths(): Observable<MoneyMonths[]> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.get<MoneyMonths[]>(this.moneyMonthsUrl, httpOpt);
  }

  createTransaction(t: MoneyTransactions): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.moneyCreateTransactiondUrl, t, httpOpt);
  }

  deleteCategory(category: MoneyCategories): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.moneyDeleteCategoryUrl, category, httpOpt);
  }

  deleteTransaction(model: MoneyTransactions): Observable<ResponseServer> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<ResponseServer>(this.moneyDeleteTransactionUrl, model, httpOpt);
  }
    
   getListTransactions(currentMonth: MoneyMonths): Observable<MoneyTransactions[]> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.token
      })
    };

    return this.http.post<MoneyTransactions[]>(this.moneyTransactionsUrl, currentMonth, httpOpt);
  }
}
