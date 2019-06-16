import {NgModule, ModuleWithProviders} from '@angular/core';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {deLocale} from 'ngx-bootstrap/locale';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

defineLocale('it', deLocale);

import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
//import {ConfirmationModalModule} from 'ng-confirmation-modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {NgxLoadingModule, ngxLoadingAnimationTypes} from 'ngx-loading';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgSelectModule } from '@ng-select/ng-select';
import {SecurityComponent} from './security/security.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {EqualValidator} from './security/equal.validator';
import {DefaultLayoutComponent} from '../containers/default-layout/default-layout.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {PrivateComponent} from './private.component';
import {PrivateRoutingModule} from './private.routing';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {DashboardComponent} from './dashboard/dashboard.component';

// *************** MONEY ****************
import {MoneyDashboardComponent} from './money-dashboard/money-dashboard.component';
import {MoneyDashboardService} from './money-dashboard/money-dashboard.service';
import {MoneyCategoriesComponent} from './money-categories/money-categories.component';
import {MoneyCategoriesService} from './money-categories/money-categories.service';
import {MoneyDictionaryCategoriesComponent} from './money-dictionary-categories/money-dictionary-categories.component';
import {MoneyDictionaryCategoriesService} from './money-dictionary-categories/money-dictionary-categories.service';
import {MoneyChartsComponent} from './money-charts/money-charts.component';
import {MoneyChartsService} from './money-charts/money-charts.service';

import {P404Component} from '../views/error/404.component';
import {P500Component} from '../views/error/500.component';
import {LoginComponent} from '../views/login/login.component';
import {RegisterComponent} from '../views/register/register.component';

/********************* INSTAGRAM ********************/
import { InstaProfileComponent } from './insta-profile/insta-profile.component';
import { InstaProfileService } from './insta-profile/insta-profile.service';
import { InstaAnalyticsComponent } from './insta-analytics/insta-analytics.component';
import { InstaAnalyticsService } from './insta-analytics/insta-analytics.service';
import { InstaContentComponent } from './insta-content/insta-content.component';
import { InstaContentService } from './insta-content/insta-content.service';
import { InstaPodsComponent } from './insta-pods/insta-pods.component';
import { InstaPodsService } from './insta-pods/insta-pods.service';
import { InstaPodChartComponent } from './insta-pod-chart/insta-pod-chart.component';
import { InstaPodChartService } from './insta-pod-chart/insta-pod-chart.service';
import { InstaPodUsersComponent } from './insta-pod-users/insta-pod-users.component';
import { InstaPodUsersService } from './insta-pod-users/insta-pod-users.service';

@NgModule({
  imports: [
    CommonModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    NgbModule.forRoot(),
    FormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0)',
      backdropBorderRadius: '4px',
      primaryColour: '#666666',
      secondaryColour: '#666666',
      tertiaryColour: '#666666',
      fullScreenBackdrop: true
    }),
    /* ConfirmationModalModule.forRoot({
      confirmBtnClass: 'btn btn-success',
      confirmBtnText: 'Confirm',
      cancelBtnClass: 'btn btn-danger',
      cancelBtnText: 'Cancel',
      modalSize: 'sm',
      modalClass: ''
    }), */
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    NgxDatatableModule,
    BrowserAnimationsModule,
    PrivateRoutingModule
  ],
  declarations: [
    PrivateComponent,
    SecurityComponent,
    EqualValidator,
    DefaultLayoutComponent,
    ProfileComponent,
    SettingsComponent,
    DashboardComponent,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    MoneyDashboardComponent,
    MoneyCategoriesComponent,
    MoneyDictionaryCategoriesComponent,
    MoneyChartsComponent,
    InstaProfileComponent,
    InstaAnalyticsComponent,
    InstaContentComponent,
    InstaPodsComponent,
    InstaPodChartComponent,
    InstaPodUsersComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    MoneyDashboardService,
    MoneyCategoriesService,
    MoneyDictionaryCategoriesService,
    MoneyChartsService,
    InstaAnalyticsService,
    InstaProfileService,
    InstaContentService,
    InstaPodsService,
    InstaPodChartService,
    InstaPodUsersService]
})
export class PrivateModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PrivateModule
    };
  }
}
