import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SessionUser } from '../../_models/index';
import { UserProfile } from '../../_models/index';
import { Role } from '../../_models/index';
import { AuthenticationService } from '../../_services/index';

import { MoneyCategories } from '../../_models/money/money-categories';

import { MoneyMonths } from '../../_models/money/money-months';
import { ResponseServer } from '../../_models/response-server';

import { MoneyDicCategories } from '../../_models/money/money-dic-categories';


@Injectable() 
export class MoneyDictionaryCategoriesService {

    private moneyDicCatsUrl = 'pr/getMoneyDictionaryCategories'; 
    private moneyCreateDicCatsUrl = 'pr/createMoneyDictionaryCategories';
    private moneyUpdateDicCatsUrl = 'pr/updateMoneyDictionaryCategories';
    private moneyDeleteDicCatsUrl = 'pr/deleteMoneyDictionaryCategories';
    
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
        
    }

    getMoneyDicCats() : Observable<MoneyDicCategories[]> {  
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };    
      
        return this.http.get<MoneyDicCategories[]>(this.moneyDicCatsUrl, httpOpt);
    } 
    
    createMoneyDicCats(dicCategory: MoneyDicCategories) : Observable<ResponseServer> {  
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };    
      
        return this.http.post<ResponseServer>(this.moneyCreateDicCatsUrl, dicCategory, httpOpt);
    }
    
    updateMoneyDicCats(dicCategory: MoneyDicCategories) : Observable<ResponseServer> {  
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };    
      
        return this.http.post<ResponseServer>(this.moneyUpdateDicCatsUrl, dicCategory, httpOpt);
    }
    
    deleteMoneyDicCats(dicCategory: MoneyDicCategories) : Observable<ResponseServer> {  
        const httpOpt = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.authenticationService.token
            })
        };    
      
        return this.http.post<ResponseServer>(this.moneyDeleteDicCatsUrl, dicCategory, httpOpt);
    }
    
    
}