import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CurrencyPipe} from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MoneyDashboardService} from '../money-dashboard/money-dashboard.service';
import {MoneyDashboard} from '../../_models/money/money-dashboard';
import {MoneyMonths} from '../../_models/money/money-months';
import {MoneyAddCategory} from '../../_models/money/money-add-category';
import {MoneyDicCategories} from '../../_models/money/money-dic-categories';
import {MoneyCategories} from '../../_models/money/money-categories';
import {ResponseServer} from '../../_models/response-server';
import {ToastrService} from 'ngx-toastr';
import {MoneyCategoriesService} from '../money-categories/money-categories.service';
import {MoneyChartsService} from '../money-charts/money-charts.service';
import {MoneyDictionaryCategoriesService} from '../money-dictionary-categories/money-dictionary-categories.service';

import {ChartsPie} from '../../_models/charts/charts-pie';
import {ChartsDatas} from '../../_models/charts/charts-datas';
import {ChartsDataset} from '../../_models/charts/charts-dataset';

import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-money-charts',
  templateUrl: './money-charts.component.html',
  styleUrls: ['./money-charts.component.css']
})
export class MoneyChartsComponent implements OnInit {

  moneyDashboard: MoneyDashboard;
  responseServer: ResponseServer;
  moneyMonths: MoneyMonths[];
  moneyDicCats: MoneyDicCategories[];
  currentMonth: MoneyMonths;
  currentCategory: MoneyDicCategories;
  closeResult: string;
  monthList: string[];
  yearList: number[];

  public loading = false;

  chartOptions = {responsive: true};

  pieLoading = false;
  pieEmpty = false;
  pieData: number[];
  pieLabels: string[];
  chartsPie: ChartsPie;

  barCatLoading = false;
  barCatEmpty = false;
  barCatData: number[];
  barCatLabels: string[];
  chartsBarCat: ChartsPie;

  barEULoading = false;
  barEmpty = false;
    
  barRisparmioLoading = false;
  barRisparmioEmpty = false;

  chartsBar: ChartsDatas;
  chartsBarDataset: ChartsDataset[];
  chartsBarLabels: string[];
    
  chartsBarRisparmio: ChartsDatas;
  chartsBarRisparmioDataset: ChartsDataset[];
  chartsBarRisparmioLabels: string[];

  listCategories: MoneyDicCategories[] = [];
  listPeriodo: string[] = [];
  currentPeriodo: string;
  currentRisparmioPeriodo: string;

  barChartOpt = {
    scales: {
      yAxes: [{
        ticks: {
          userCallback: function(value, index, values) {
            return value.toLocaleString('it-IT', {style: 'currency', currency: 'EUR'});
          },
          min: 0
        }
      }]
    }
  };
    
  barChartOpt2 = {
    scales: {
      yAxes: [{
        ticks: {
          userCallback: function(value, index, values) {
            return value.toLocaleString('it-IT', {style: 'currency', currency: 'EUR'});
          },
          min: 0
        }
      }]
    }
  };

  public barChartsEuColors: any[] = [{
    backgroundColor: 'rgba(77,189,111,0.7)',
    borderColor: '#4dbd74',
    pointBackgroundColor: '#4dbd74',
    pointBorderColor: '#4dbd74',
    pointHoverBackgroundColor: '#4dbd74',
    pointHoverBorderColor: '#4dbd74'
  }, {
    backgroundColor: 'rgba(248,108,107,0.7)',
    borderColor: '#f86c6b',
    pointBackgroundColor: '#f86c6b',
    pointBorderColor: '#f86c6b',
    pointHoverBackgroundColor: '#f86c6b',
    pointHoverBorderColor: '#f86c6b'
  }];

  colors2: any[] = [{
    backgroundColor: 'rgba(97,192,255,0.5)',
    borderColor: '#61c0ff',
  }];

  public barChartsRisparmioColors: any[] = [{
    backgroundColor: 'rgba(99,194,222,0.7)',
    borderColor: '#5898ab',
    pointBackgroundColor: '#5898ab',
    pointBorderColor: '#5898ab',
    pointHoverBackgroundColor: '#5898ab',
    pointHoverBorderColor: '#5898ab'
  }];
    
  constructor(private moneyDashboardService: MoneyDashboardService,
    private moneyCategoriesService: MoneyCategoriesService,
    private moneyDictionaryCategoriesService: MoneyDictionaryCategoriesService,
    private moneyChartsService: MoneyChartsService,
    private modalService: NgbModal,
    private toastr: ToastrService) {

  }

  ngOnInit() {

    this.moneyCategoriesService.getListCategories()
      .subscribe(data => {
        this.listCategories = data;
        if (data.length > 0) {
          this.currentCategory = this.listCategories[0];
          this.updateBarChartsCategory(this.currentCategory);
        }

      });

    this.moneyCategoriesService.getMoneyMonths()
      .subscribe(data => {
        this.moneyMonths = data;

        if (this.moneyMonths.length === 7) {
          this.currentMonth = this.moneyMonths[1];
        } else {
          this.currentMonth = this.moneyMonths[0];
        }

        this.updatePieChartsCategory(this.currentMonth);
      });

    this.moneyChartsService.getMoneyListPeriodo()
      .subscribe(data => {
        this.listPeriodo = data;

        if (data.length > 0) {
          this.currentPeriodo = this.listPeriodo[0];
          this.currentRisparmioPeriodo = this.listPeriodo[0];
          this.updateBarChartsEU(this.currentPeriodo);
          this.updateBarChartsRisparmio(this.currentPeriodo);
        }

      });
  }

  onChartClick(event) {

  }

  updatePieChartsCategory(value: MoneyMonths) {
    this.pieLoading = true;

    this.moneyChartsService.getMoneyPieChartsCategory(value)
      .subscribe(data => {
        setTimeout(() => {

          if (data) {
            this.pieEmpty = false;
            this.chartsPie = data;
            this.pieData = this.chartsPie.data;
            this.pieLabels = this.chartsPie.labels;
            this.pieLoading = false;
          } else {
            this.pieLoading = false;
            this.pieEmpty = true;
          }
        }, 1000);
      });
  }

  updateBarChartsCategory(currentCategory: MoneyDicCategories) {
    this.barCatLoading = true;

    this.moneyChartsService.getBarChartsCategory(currentCategory)
      .subscribe(data => {

        if (data) {
          this.barCatEmpty = false;
          this.chartsBarCat = data;
          this.barCatData = this.chartsBarCat.data;
          this.barCatLabels = this.chartsBarCat.labels;
          this.barCatLoading = false;
        } else {
          this.barCatLoading = false;
          this.barCatEmpty = true;
        }

      });
  }

  updateBarChartsEU(currentPeriodo: string) {
    this.barEULoading = true;

    this.moneyChartsService.getBarChartsEU(currentPeriodo)
      .subscribe(data => {

        if (data) {
          this.barEmpty = false;
          this.chartsBar = data;
          this.chartsBarDataset = this.chartsBar.dataset;
          this.chartsBarLabels = this.chartsBar.labels;
          this.barEULoading = false;
        } else {
          this.barEULoading = false;
          this.barEmpty = true;
        }

      });
  }
    
  updateBarChartsRisparmio(currentPeriodo: string) {
    this.barRisparmioLoading = true;

    this.moneyChartsService.getBarChartsRisparmio(currentPeriodo)
      .subscribe(data => {

        if (data) {
          this.barRisparmioEmpty = false;
          this.chartsBarRisparmio = data;
          this.chartsBarRisparmioDataset = this.chartsBarRisparmio.dataset;
          this.chartsBarRisparmioLabels = this.chartsBarRisparmio.labels;
          this.barRisparmioLoading = false;
        } else {
          this.barRisparmioLoading = false;
          this.barRisparmioEmpty = true;
        }

      });
  }

  compareFnPeriodo(c1: string, c2: string): boolean {
    return c1 && c2 ? c1 === c2 : c1 === c2;
  }

  compareFnCat(c1: MoneyDicCategories, c2: MoneyDicCategories): boolean {
    return c1 && c2 ? c1.idDictionaryCat === c2.idDictionaryCat : c1 === c2;
  }

  compareFn(c1: MoneyMonths, c2: MoneyMonths): boolean {
    return c1 && c2 ? c1.option === c2.option : c1 === c2;
  }
}
