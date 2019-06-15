import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {P404Component} from '../views/error/404.component';
import {P500Component} from '../views/error/500.component';
import {LoginComponent} from '../views/login/login.component';
import {RegisterComponent} from '../views/register/register.component';
import {AuthGuard} from '../_guards/index';

import {PrivateComponent} from './private.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MoneyDashboardComponent} from './money-dashboard/money-dashboard.component';
import {MoneyCategoriesComponent} from './money-categories/money-categories.component';
import {MoneyChartsComponent} from './money-charts/money-charts.component';
import {MoneyDictionaryCategoriesComponent} from './money-dictionary-categories/money-dictionary-categories.component';
import { InstaProfileComponent } from './insta-profile/insta-profile.component';
import { InstaAnalyticsComponent } from './insta-analytics/insta-analytics.component';
import { InstaContentComponent } from './insta-content/insta-content.component';
import { InstaPodsComponent } from './insta-pods/insta-pods.component';
import { InstaPodChartComponent } from './insta-pod-chart/insta-pod-chart.component';
import { InstaPodUsersComponent } from './insta-pod-users/insta-pod-users.component';

export const privateRoutes: Routes = [
  {
    path: 'private', component: PrivateComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      //        {path: 'profile', component: ProfileComponent},
      //        {path: 'settings', component: SettingsComponent},
      //        {path: 'security', component: SecurityComponent},
      {path: 'money.dashboard', component: MoneyDashboardComponent},
      {path: 'money.categories', component: MoneyCategoriesComponent},
      {path: 'money.charts', component: MoneyChartsComponent},
      {path: 'money.dictionary.categories', component: MoneyDictionaryCategoriesComponent},
      {path: 'insta.profile', component: InstaProfileComponent},
      {path: 'insta.analytics', component: InstaAnalyticsComponent},
      {path: 'insta.content', component: InstaContentComponent},
      {path: 'insta.pods', component: InstaPodsComponent},
      {path: 'insta.pod.chart', component: InstaPodChartComponent},
      {path: 'insta.pod.users', component: InstaPodUsersComponent}
      // {path: 'instagram', loadChildren: 'app/private/instagram/instagram.module#InstagramModule', canActivate: [AuthGuard]}
    ]
  }
];
// export const routes: Routes = [
//  {
//    path: '',
//    redirectTo: 'dashboard',
//    pathMatch: 'full',
//  },
//  {
//    path: '404',
//    component: P404Component,
//    data: {
//      title: 'Page 404'
//    }
//  },
//  {
//    path: '500',
//    component: P500Component,
//    data: {
//      title: 'Page 500'
//    }
//  },
//  {
//    path: 'login',
//    component: LoginComponent,
//    data: {
//      title: 'Login Page'
//    }
//  },
//  {
//    path: 'register',
//    component: RegisterComponent,
//    data: {
//      title: 'Register Page'
//    }
//  },
//  {
//    path: '',
//    component: DefaultLayoutComponent,
//    data: {
//      title: 'Home'
//    },
//    children: [
//      {
//        path: 'base',
//        loadChildren: '../views/base/base.module#BaseModule'
//      },
//      {
//        path: 'buttons',
//        loadChildren: '../views/buttons/buttons.module#ButtonsModule'
//      },
//      {
//        path: 'charts',
//        loadChildren: '../views/chartjs/chartjs.module#ChartJSModule'
//      },
//      {
//        path: 'dashboard',
//        loadChildren: '../views/dashboard/dashboard.module#DashboardModule'
//      },
//      {
//        path: 'icons',
//        loadChildren: '../views/icons/icons.module#IconsModule'
//      },
//      {
//        path: 'notifications',
//        loadChildren: '../views/notifications/notifications.module#NotificationsModule'
//      },
//      {
//        path: 'theme',
//        loadChildren: '../views/theme/theme.module#ThemeModule'
//      },
//      {
//        path: 'widgets',
//        loadChildren: '../views/widgets/widgets.module#WidgetsModule'
//      }
//    ]
//  }
// ];

@NgModule({
  imports: [RouterModule.forChild(privateRoutes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {}
