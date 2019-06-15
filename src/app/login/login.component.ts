import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    message: string;
    isSignup: boolean;
    successLogin: boolean = true;
    notLoginMessage: string = "Bad credentials";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.isSignup = false;
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/private';
        
        this.route.queryParams.subscribe( params => {
            if(params.message) {
                this.isSignup = true;
                this.message = params.message;
            }
        });
    }

    login() {
        this.successLogin = true;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    if(data.username) {
                        /*var authority = data.role;
                        if(authority == "ROLE_ADMIN") {
                            this.authenticationService.isAdmin = true;
                        } else if (authority == "ROLE_USER") {
                            //this.router.navigate(["/user"]); 
                        }*/
                        
                        this.router.navigate(["/private/money.dashboard"]);
                    } else {
                        this.loading = false;
                        this.successLogin = false;
                    } 
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

