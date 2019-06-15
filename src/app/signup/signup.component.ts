import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Routes, RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserProfile } from '../_models/';
import { ResponseServer } from '../_models/response-server';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    userSignup: UserProfile;
    responseServer: ResponseServer;
    isError: boolean;
    isSubmitted: boolean;
    message: String;
    
    constructor(private router: Router,
        private activeRoute: ActivatedRoute,
        private signupService: SignupService) { }

    ngOnInit() {
        this.isError = false;
        this.isSubmitted = false;
        this.message = "";
    }
    
    signup(signupForm: NgForm) {
        
        this.signupService.signup(signupForm.value)
            .subscribe(data => {
                this.responseServer = data;
                this.message = this.responseServer.message;
                this.isSubmitted = true;
                if(this.responseServer.code == "200") {
                    this.isError = false;
                    
                } else {
                    this.isError = true;
                }
            });
    }
}
