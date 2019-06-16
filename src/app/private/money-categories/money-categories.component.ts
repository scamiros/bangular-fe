import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Routes, RouterModule, Router} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import {MoneyCategories} from '../../_models/money/money-categories';
import {MoneyTransactions} from '../../_models/money/money-transactions';
import {MoneyMonths} from '../../_models/money/money-months';
import {MoneyCategoriesService} from './money-categories.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ResponseServer} from '../../_models/response-server';
import {ToastrService} from 'ngx-toastr';

import {MoneyDashboardService} from '../money-dashboard/money-dashboard.service';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-money-categories',
  templateUrl: './money-categories.component.html',
  styleUrls: ['./money-categories.component.css']
})
export class MoneyCategoriesComponent implements OnInit {

  moneyCategories: MoneyCategories[];
  moneyCategoriesB: MoneyCategories[];
  newMoneyTransaction: MoneyTransactions;
  currentCategory: MoneyCategories;
  currentTransaction: MoneyTransactions;
  moneyMonths: MoneyMonths[];
  listTransactions: MoneyTransactions[];
  currentMonth: MoneyMonths = {
    month: null,
    option: ''
  };

  modalRef: BsModalRef;
  modalrefTransaction: any;
  responseServer: ResponseServer;
  tempDate: Date;
  minDate: Date;
  maxDate: Date;

  public viewType = 'cat';
  public loading = false;
    
  columns = [
    { prop: 'transaction', name:'Transazione' },
    { prop: 'dtTransaction', name: 'Data' },
    { prop: 'amount', name: 'Spesa' },
    { prop: 'category', name: 'Categoria' }
  ];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private moneyCategoriesService: MoneyCategoriesService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private moneyDashboardService: MoneyDashboardService,
    private modalServiceNgx: BsModalService
  ) {

  }

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

          this.updateCategories(this.currentMonth);
        });
      });


  }

  updateCategories(value: MoneyMonths) {

      this.moneyCategories = [];
      
    this.moneyCategoriesService.getUserCategories(value)
      .subscribe(data => {
        setTimeout(() => {
            
            this.moneyCategoriesB = data;
            this.limitTransaction();
            this.loading = false;
        this.viewType = 'cat';
         }, 500);
      });
  }

   limitTransaction() {
        
        for(let category of this.moneyCategoriesB) {
            
            let retCat = {
                idCategory: category.idCategory,
                category: category.category,
                tipo: category.tipo,
                budget: category.budget,
                spesa: category.spesa,
                bilancio: category.bilancio,
                mDashboard: category.mDashboard,
                mtransactions: category.mtransactions,
                more: category.more
            };
            
            if(category.mtransactions.length > 4) {
                
                retCat.mtransactions = retCat.mtransactions.slice(category.mtransactions.length - 4);
                retCat.more = true;
            }
            this.moneyCategories.push(retCat);
        }
   }
    
    getCategory(category: MoneyCategories) {
        
        let retCat = null;
        for(let c of this.moneyCategoriesB) {
            
            if(c.idCategory == category.idCategory) {
                retCat = c;
                break;
            }
        }
        
        return retCat;
   }
   
   viewAll(category: MoneyCategories) {
       
       category.mtransactions = this.getCategory(category).mtransactions;
       category.more = false;
   }
   updateCategoriesList(value: MoneyMonths) {

    this.moneyCategoriesService.getListTransactions(value)
      .subscribe(data => {
        this.loading = false;
        this.viewType = 'list';
        this.listTransactions = data;
      });
  }

  onDateChange(value: MoneyMonths): void {
    this.loading = true;
    this.currentMonth = value;
    this.loading = false;
    
    this.updateCategories(this.currentMonth);

  }

  compareFn(c1: MoneyMonths, c2: MoneyMonths): boolean {
    return c1 && c2 ? c1.option === c2.option : c1 === c2;
  }

  openNewTransaction(content, category: MoneyCategories) {

    const dtTmp = this.moneyDashboardService.getDateFromString(this.currentMonth.month);

    this.minDate = new Date(dtTmp.getUTCFullYear(), dtTmp.getUTCMonth() + 1, 1);
    this.maxDate = new Date(dtTmp.getUTCFullYear(), dtTmp.getUTCMonth() + 2, 0);
    this.currentCategory = category;
    this.modalrefTransaction = this.modalService.open(content);

  }

  createTransaction(newTransactionForm: NgForm) {

    this.newMoneyTransaction = {
      idTransaction: 0,
      dtTransaction: newTransactionForm.value.dateTransaction,
      amount: newTransactionForm.value.amount,
      transaction: newTransactionForm.value.desc,
      mCategory: this.currentCategory,
      category: ''
    };
    this.moneyCategoriesService.createTransaction(this.newMoneyTransaction)
      .subscribe(data => {
        this.responseServer = data;

        if (this.responseServer.code === '200') {
          this.toastr.success(this.responseServer.message);
          this.modalrefTransaction.close();
          this.updateCategories(this.currentMonth);
        } else {
          this.toastr.error(this.responseServer.message);
        }
      });
  }

  deleteCategory(category: MoneyCategories) {
    this.loading = true;
    this.moneyCategoriesService.deleteCategory(category)
      .subscribe(data => {
        this.responseServer = data;

        if (this.responseServer.code === '200') {
          this.toastr.success(this.responseServer.message);
          this.updateCategories(this.currentMonth);
        } else {
          this.toastr.error(this.responseServer.message);
        }
      });
  }

  deleteTransaction(model: MoneyTransactions) {
    this.loading = true;
    this.moneyCategoriesService.deleteTransaction(model)
      .subscribe(data => {
        this.responseServer = data;

        if (this.responseServer.code === '200') {
          this.toastr.success(this.responseServer.message);
          this.updateCategories(this.currentMonth);
        } else {
          this.toastr.error(this.responseServer.message);
        }
      }); 
  }

  openDelTransaction(template: TemplateRef<any>, t: MoneyTransactions) {
    this.currentTransaction = t;
    this.modalrefTransaction = this.modalServiceNgx.show(template);
  }

  delTransConfirm(): void {
    this.loading = true;
    this.moneyCategoriesService.deleteTransaction(this.currentTransaction)
      .subscribe(data => {
        this.responseServer = data;

        if (this.responseServer.code === '200') {
          this.toastr.success(this.responseServer.message);
          this.updateCategories(this.currentMonth);
        } else {
          this.toastr.error(this.responseServer.message);
        }
      }); 
    this.modalrefTransaction.hide();
  }
 
  delTransCancel(): void {
    this.modalrefTransaction.hide();
  }

  goToDashboard() {
    this.router.navigate(['/private/money.dashboard', this.currentMonth]);
  }

}
