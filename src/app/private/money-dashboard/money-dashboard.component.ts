import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Routes, RouterModule, Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MoneyDashboardService} from './money-dashboard.service';
import {MoneyDashboard} from '../../_models/money/money-dashboard';
import {MoneyMonths} from '../../_models/money/money-months';
import {MoneyAddCategory} from '../../_models/money/money-add-category';
import {MoneyDicCategories} from '../../_models/money/money-dic-categories';
import {MoneyCategories} from '../../_models/money/money-categories';
import {MoneyDashboardNew} from '../../_models/money/money-dashboard-new';
import {ResponseServer} from '../../_models/response-server';
import {ToastrService} from 'ngx-toastr';
import {MoneyCategoriesService} from '../money-categories/money-categories.service';
import {MoneyDictionaryCategoriesService} from '../money-dictionary-categories/money-dictionary-categories.service';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-money-dashboard',
  templateUrl: './money-dashboard.component.html',
  styleUrls: ['./money-dashboard.component.css']
})
export class MoneyDashboardComponent implements OnInit {

  moneyDashboard: MoneyDashboard;
  responseServer: ResponseServer;
  moneyMonths: MoneyMonths[];
  moneyDicCats: MoneyDicCategories[];
  currentMonth: MoneyMonths = {
    month: '',
    option: ''
  };

  currentCategory: MoneyCategories;
  newCategory: MoneyAddCategory;
  closeResult: string;
  monthList: string[];
  yearList: number[];
  modalrefDashboard: any;
  modalrefSetSaldo: any;
  modalrefSetBudget: any;
  isNewMonth: boolean;
  isNewCategory: boolean;
  formattedAmount: string;
  copyMonths: MoneyMonths[];
  public loading = false;
  emptyCategories = false;
  noPastMonths = false;
  currentDashboard: number;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private moneyDashboardService: MoneyDashboardService,
    private moneyCategoriesService: MoneyCategoriesService,
    private moneyDictionaryCategoriesService: MoneyDictionaryCategoriesService,
    private modalService: NgbModal,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.loading = true;
    this.moneyCategoriesService.getMoneyMonths()
      .subscribe(data => {

        this.moneyMonths = data;

        this.activeRoute.params.subscribe(params => {

          if (params.month) {
            this.currentMonth.month = params.month;
            this.currentMonth.option = params.option;
          } else {

            if (this.moneyMonths.length === 7) {
              this.currentMonth = this.moneyMonths[1];

            } else {
              this.currentMonth = this.moneyMonths[0];
            }
          }

          this.updateDashboard(this.currentMonth);
        });

      });
  }

  updateDashboard(value: MoneyMonths) {
    this.loading = true;

    this.moneyDashboardService.getUserDashboard(this.currentMonth)
      .subscribe(data => {

        this.loading = false;
        this.moneyDashboard = data;
        this.currentDashboard = this.moneyDashboard.idDashboard;
        this.emptyCategories = (this.moneyDashboard.categoriesList.length === 0) ? true : false;
      });
  }

  onDateChange(value: MoneyMonths): void {
    this.loading = true;
    this.currentMonth = value;
    this.moneyDashboardService.getUserDashboard(value)
      .subscribe(data => {
        this.loading = false;
        this.moneyDashboard = data;
        this.currentDashboard = this.moneyDashboard.idDashboard;
        this.emptyCategories = (this.moneyDashboard.categoriesList.length === 0) ? true : false;
      });

  }

  onCategoryChange(value: MoneyDicCategories, newRecordForm: NgForm): void {

    if (value.tipo === 'E') {
      newRecordForm.form.controls.budget.disable();
    }

  }

  compareFn(c1: MoneyMonths, c2: MoneyMonths): boolean {
    return c1 && c2 ? c1.option === c2.option : c1 === c2;
  }

  openNewMonth(content) {

    this.moneyDashboardService.getMoneyMonthsCopy(this.currentMonth)
      .subscribe(data => {
        this.copyMonths = data;
        if (this.copyMonths.length === 0) {
          this.toastr.warning('No Month available for copy.');
        } else {
          this.isNewMonth = true;
          this.modalrefDashboard = this.modalService.open(content);
        }
      });
  }

  openNewCategory(content) {
    this.loading = true;
    this.moneyDictionaryCategoriesService.getMoneyDicCats()
      .subscribe(data => {

        if (data.length > 0) {
          this.moneyDicCats = data;
          this.isNewMonth = false;
          this.isNewCategory = true;
          this.loading = false;

          this.moneyDashboardService.getMoneyMonthsCopy(this.currentMonth)
            .subscribe(data => {
              this.copyMonths = data;
              this.noPastMonths = (this.copyMonths.length === 0) ? true : false;
              this.modalrefDashboard = this.modalService.open(content);
            });
        } else {
          this.loading = false;
          this.toastr.warning('No Categories found in dictionary. Create some first.');
        }

      });
  }

  openSetSaldo(content2) {
    this.modalrefSetSaldo = this.modalService.open(content2);
  }

  openSetBudget(content3, category: MoneyCategories) {

    this.currentCategory = category;
    this.modalrefSetBudget = this.modalService.open(content3);
  }

  setBudget(setBudgetForm: NgForm) {
    this.currentCategory.budget = setBudgetForm.value.budget;
    this.moneyDashboardService.updateMonthCategory(this.currentCategory)
      .subscribe(data => {
        this.responseServer = data;
        if (this.responseServer.code === '200') {
          this.modalrefSetBudget.close();
          this.updateDashboard(this.currentMonth);
          this.toastr.success(this.responseServer.message);
        } else {
          this.toastr.error(this.responseServer.message);
        }
      });
  }

  create(newRecordForm: NgForm) {

    if (this.isNewMonth) {
      this.createDashboard(newRecordForm);
    } else if (this.isNewCategory) {
      this.createCategory(newRecordForm);
    }
  }

  createDashboard(newMonthForm: NgForm) {

    var copy = newMonthForm.value.copyMonth;
    if (copy === '') {
      copy = null;
    }

    var newDashboard = {
      idDashboard: this.currentDashboard,
      copyMonth: copy
    };

    this.moneyDashboardService.createDashboard(newDashboard)
      .subscribe(data => {
        this.responseServer = data;

        if (this.responseServer.code === '200') {
          this.toastr.success(this.responseServer.message);
          this.modalrefDashboard.close();
          this.updateDashboard(this.currentMonth);
        } else {
          this.toastr.error(this.responseServer.message);
        }
      });
  }

  createCategory(newCategoryForm: NgForm) {

    this.newCategory = {
      tipo: newCategoryForm.value.newCategory.idDictionaryCat,
      dtDashboard: this.currentMonth.month,
      budget: newCategoryForm.value.budget
    };
    this.moneyDashboardService.createCategory(this.newCategory)
      .subscribe(data => {
        this.responseServer = data;

        if (this.responseServer.code === '200') {
          this.toastr.success(this.responseServer.message);
          this.modalrefDashboard.close();
          this.updateDashboard(this.currentMonth);
        } else {
          this.toastr.error(this.responseServer.message);
        }
      });
  }

  uSaldo(uSaldoForm: NgForm) {

    this.loading = true;
    this.moneyDashboard.saldo = uSaldoForm.value.saldo;
    this.moneyDashboardService.updateMonthDashboard(this.moneyDashboard)
      .subscribe(data => {

        this.responseServer = data;

        if (this.responseServer.code === '200') {
          this.toastr.success(this.responseServer.message);
          this.modalrefSetSaldo.close();
          this.updateDashboard(this.currentMonth);
          this.loading = false;
        } else {
          this.toastr.error(this.responseServer.message);
          this.loading = false;
        }

      });
  }

  goToCategories() {
    this.router.navigate(['/private/money.categories', this.currentMonth]);
  }


}
