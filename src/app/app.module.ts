import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';

import {registerLocaleData} from '@angular/common';
import it from '@angular/common/locales/it';
registerLocaleData(it);

// Util modules
import {BrowserModule} from '@angular/platform-browser';
import {ToastrModule} from 'ngx-toastr';

import {NgxLoadingModule, ngxLoadingAnimationTypes} from 'ngx-loading';
import {PrivateModule} from './private/private.module';

import {AuthGuard} from './_guards/index';
import {AuthenticationService, UserService, AlertService} from './_services/index';
import {SignupService} from './signup/signup.service';
import {PrivateService} from './private/private.service';
import {LoginComponent} from './login/index';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ToastrModule.forRoot(),
    PrivateModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0)',
      backdropBorderRadius: '4px',
      primaryColour: '#666666',
      secondaryColour: '#666666',
      tertiaryColour: '#666666',
      fullScreenBackdrop: true
    }),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LOCALE_ID, useValue: 'it'},
    AuthGuard,
    AuthenticationService,
    UserService,
    AlertService,
    PrivateService,
    SignupService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}