import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry, take, map} from 'rxjs/operators';
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
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { exhaustMap } from 'rxjs-compat/operator/exhaustMap';

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
    private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>) {

  }

  getUserCategories(currentMonth: MoneyMonths): Observable<MoneyCategories[]> {
        return this.http.post<MoneyCategories[]>(this.moneyMonthCategoriesUrl, currentMonth);
  }

  getListCategories(): Observable<MoneyDicCategories[]> {
    return this.http.get<MoneyDicCategories[]>(this.moneyCategoriesUrl);
  }

  getMoneyMonths(): Observable<MoneyMonths[]> {
    return this.http.get<MoneyMonths[]>(this.moneyMonthsUrl);
  }

  createTransaction(t: MoneyTransactions): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(this.moneyCreateTransactiondUrl, t);
  }

  deleteCategory(category: MoneyCategories): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(this.moneyDeleteCategoryUrl, category);
  }

  deleteTransaction(model: MoneyTransactions): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(this.moneyDeleteTransactionUrl, model);
  }
    
   getListTransactions(currentMonth: MoneyMonths): Observable<MoneyTransactions[]> {
    return this.http.post<MoneyTransactions[]>(this.moneyTransactionsUrl, currentMonth);
  }
}
