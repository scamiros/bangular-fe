import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

   
}