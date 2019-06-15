import { Component, OnInit } from '@angular/core';
import { MoneyDictionaryCategoriesService } from '../money-dictionary-categories/money-dictionary-categories.service';
import { ResponseServer } from '../../_models/response-server';
import { NgForm } from '@angular/forms';
import { ToastrService }   from 'ngx-toastr';
import { MoneyDicCategories } from '../../_models/money/money-dic-categories';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-money-dictionary-categories',
  templateUrl: './money-dictionary-categories.component.html',
  styleUrls: ['./money-dictionary-categories.component.css']
})
export class MoneyDictionaryCategoriesComponent implements OnInit {
    
    moneyDicCats: MoneyDicCategories[];
    public loading = false;
    modalrefCreateDicCat: any;
    modalrefDeleteDicCat: any;
    responseServer: ResponseServer;
    
    constructor(
        private moneyDictionaryCategoriesService: MoneyDictionaryCategoriesService,
        private modalService: NgbModal,
        private toastr: ToastrService) { }
    
    ngOnInit() {
        this.getDictionaryCategoriesList();
    }
    
    getDictionaryCategoriesList() {
        this.loading = true;
        this.moneyDictionaryCategoriesService.getMoneyDicCats()
            .subscribe(data => {
                this.moneyDicCats = data;    
            });
    }
    
    openCreateDicCat(content4) {
        this.modalrefCreateDicCat = this.modalService.open(content4);
    }
    
    createDicCat(createDicCatForm: NgForm) {
        this.moneyDictionaryCategoriesService.createMoneyDicCats(createDicCatForm.value)
            .subscribe(data => {
                this.responseServer = data;
              
                if(this.responseServer.code == "200") {
                    this.toastr.success(this.responseServer.message);
                    this.modalrefCreateDicCat.close();
                    this.getDictionaryCategoriesList();
                } else
                    this.toastr.error(this.responseServer.message);
                }
             );
    }
    
    updateDicCat(dicCatForm: NgForm) {
        this.moneyDictionaryCategoriesService.updateMoneyDicCats(dicCatForm.value)
            .subscribe(data => {
                this.responseServer = data;
              
                if(this.responseServer.code == "200") {
                    this.toastr.success(this.responseServer.message);
                    this.modalrefCreateDicCat.close();
                    this.getDictionaryCategoriesList();
                } else
                    this.toastr.error(this.responseServer.message);
                }
             );
    }
    
    deleteDicCat(dicCatForm: NgForm) {
        this.moneyDictionaryCategoriesService.deleteMoneyDicCats(dicCatForm.value)
            .subscribe(data => {
                this.responseServer = data;
              
                if(this.responseServer.code == "200") {
                    this.toastr.success(this.responseServer.message);
                    this.modalrefDeleteDicCat.close();
                    this.getDictionaryCategoriesList();
                } else
                    this.toastr.error(this.responseServer.message);
                }
             );
    }

}
