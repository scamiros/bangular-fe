import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ResponseServer } from '../_models/response-server';
import { UserProfile } from '../_models/user-profile';


@Injectable()   
export class SignupService {
   
    private signupUrl = 'pb/signup'; 
    private moneyCreateDicCatsUrl = 'pr/createMoneyDictionaryCategories';
    private moneyUpdateDicCatsUrl = 'pr/updateMoneyDictionaryCategories';
    private moneyDeleteDicCatsUrl = 'pr/deleteMoneyDictionaryCategories';
    
    constructor(  
        private http: HttpClient) {
        
    }

    signup(model: UserProfile) : Observable<ResponseServer> {  
        return this.http.post<ResponseServer>(this.signupUrl, model);
    }
    
    
}