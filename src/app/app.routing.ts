import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AuthGuard} from './_guards/index';

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'confirmsignup', redirectTo: '/confirmsignup'},
  {path: 'signup', component: SignupComponent},
  {path: 'private', loadChildren: 'src/app/private/private.module#PrivateModule', canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/home'}
  /*path: 'customers', component: CustomersComponent},
   {path: 'add', component: CreateCustomerComponent},
   {path: 'findbylastname', component: SearchCustomersComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {}