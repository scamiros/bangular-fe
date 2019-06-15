import { Component, OnInit } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ChartsDatas} from '../../_models/charts/charts-datas';
import {ChartsDataset} from '../../_models/charts/charts-dataset';
import {InstaPodChartService} from './insta-pod-chart.service';
import {InstaPodsService} from '../insta-pods/insta-pods.service';

import {InstaPodGroup} from '../../_models/instagram/insta-pod-group';
import {InstaPodChartBean} from '../../_models/instagram/insta-pod-chart-bean';

@Component({
    selector: 'app-insta-pod-chart',
    templateUrl: './insta-pod-chart.component.html',
    styleUrls: ['./insta-pod-chart.component.scss']
})
export class InstaPodChartComponent implements OnInit {

    instaPodGroupsList: InstaPodGroup[];
    currentGroup: InstaPodGroup;

    searchComments: InstaPodChartBean = {
        idPodGroup: null,
        metric: 'COMMENTS',
        tipo: 'COUNTER',
        dtFrom: null,
        dtTo: null
    };
    
    searchStars: InstaPodChartBean = {
        idPodGroup: null,
        metric: 'COMMENTS',
        tipo: 'COUNTER',
        dtFrom: null,
        dtTo: null
    };
    
    searchLikes: InstaPodChartBean = {
        idPodGroup: null,
        metric: 'LIKES',
        tipo: 'COUNTER',
        dtFrom: null,
        dtTo: null
    };
    searchCommentsGap: InstaPodChartBean = {
        idPodGroup: null,
        metric: 'COMMENTS',
        tipo: 'GAP',
        dtFrom: null,
        dtTo: null
    };
    
    podCommentsLabels: string[];
    periodCommentsLabel: string;
    currentPodComments: ChartsDatas;
    commentsLabels: string[];
    commentsData: ChartsDataset[];
    commentsLoading: boolean;
    
    podStarsLabels: string[];
    periodStarsLabel: string;
    currentPodStars: ChartsDatas;
    starsLabels: string[];
    starsData: ChartsDataset[];
    starsLoading: boolean;

    podLikesLabels: string[];
    periodLikesLabel: string;
    currentPodLikes: ChartsDatas;
    likesLabels: string[];
    likesData: ChartsDataset[];
    likesLoading: boolean;
    
    podCommentsGapLabels: string[];
    periodCommentsGapLabel: string;
    currentPodCommentsGap: ChartsDatas;
    commentsGapLabels: string[];
    commentsGapData: ChartsDataset[];
    commentsGapLoading: boolean;

    dtFrom: Date;
    dtTo: Date;
    
    lineChartOpt = {
        responsive: true,
        maintainAspectRatio: true,
        ticks: {
            autoSkip: false
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] 
                    + '% '
                    + data.datasets[tooltipItem.datasetIndex].label;

                    return label;
                }
            }
        }
    };

    public commentsColors: Array<any> = [{
        backgroundColor: 'rgba(24,125,160,0.5)',
        borderColor: '#187da0',
        pointBackgroundColor: '#104152',
        pointBorderColor: '#104152',
        pointHoverBackgroundColor: '#104152',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];
    
    public starsColors: Array<any> = [{
        backgroundColor: 'rgba(24,125,160,0.5)',
        borderColor: '#187da0',
        pointBackgroundColor: '#104152',
        pointBorderColor: '#104152',
        pointHoverBackgroundColor: '#104152',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];


    public likesColors: Array<any> = [{
        backgroundColor: 'rgba(248,108,107,0.5)',
        borderColor: '#f86c6b',
        pointBackgroundColor: '#a24847',
        pointBorderColor: '#a24847',
        pointHoverBackgroundColor: '#f38382',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

    constructor(
        private router: Router,
        private instaPodChartService: InstaPodChartService,
        private instaPodService: InstaPodsService) { }

    ngOnInit() {
        this.instaPodService.getInstaPodGroups()
            .subscribe(data => {

                this.instaPodGroupsList = data;
                if (this.instaPodGroupsList.length > 0) {
                    this.currentGroup = this.instaPodGroupsList[0];
                    const dt = new Date(); 
                    this.dtFrom = new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getDate() - 7);
                    this.dtTo = new Date();
                    
                    this.searchComments.idPodGroup = this.currentGroup.idPodGroup;
                    this.searchComments.dtFrom = this.dtFrom;
                    this.searchComments.dtTo = this.dtTo;
                    this.updatePodComments();
                    
                    this.searchStars.idPodGroup = this.currentGroup.idPodGroup;
                    this.searchStars.dtFrom = this.dtFrom;
                    this.searchStars.dtTo = this.dtTo;
                    this.updatePodStars();
                    
                    this.searchLikes.idPodGroup = this.currentGroup.idPodGroup;
                    this.searchLikes.dtFrom = this.dtFrom;
                    this.searchLikes.dtTo = this.dtTo;
                    this.updatePodLikes();
                    
                    this.searchCommentsGap.idPodGroup = this.currentGroup.idPodGroup;
                    this.searchCommentsGap.dtFrom = this.dtFrom;
                    this.searchCommentsGap.dtTo = this.dtTo;
                    this.updatePodCommentsGap();
                    
                }
            });
    }
    
    updatePodStatsDate(instaPodStatsForm: NgForm) {
        this.searchComments.dtFrom = instaPodStatsForm.value.dtFrom;
        this.searchComments.dtTo = instaPodStatsForm.value.dtTo;
        this.updatePodComments();
        
        this.searchCommentsGap.dtFrom = instaPodStatsForm.value.dtFrom;
        this.searchCommentsGap.dtTo = instaPodStatsForm.value.dtTo;
        this.updatePodCommentsGap();
        
        this.searchLikes.dtFrom = instaPodStatsForm.value.dtFrom;
        this.searchLikes.dtTo = instaPodStatsForm.value.dtTo;
        this.updatePodLikes();
    }
    
    updatePodComments() {
    
        this.commentsLoading = true;
        this.podCommentsLabels = [];
        this.instaPodChartService.getInstaPodStats(this.searchComments)
            .subscribe(data => {

                this.currentPodComments = data;
                this.commentsLabels = data.labels;
                this.commentsData = data.dataset;
                this.commentsLoading = false;

            });
    }
    
    updatePodStars() {
    
        this.starsLoading = true;
        this.podStarsLabels = [];
        this.instaPodChartService.getInstaPodStars(this.searchStars)
            .subscribe(data => {

                this.currentPodStars = data;
                this.starsLabels = data.labels;
                this.starsData = data.dataset;
                this.starsLoading = false;

            });
    }
    
    updatePodLikes() {

        this.likesLoading = true;
        this.podLikesLabels = [];
        this.instaPodChartService.getInstaPodStats(this.searchLikes)
            .subscribe(data => {

                this.currentPodLikes = data;
                this.likesLabels = data.labels;
                this.likesData = data.dataset;
                this.likesLoading = false;

            });
    }

    updatePodCommentsGap() {

        this.commentsGapLoading = true;
        this.podCommentsGapLabels = [];
        this.instaPodChartService.getInstaPodStats(this.searchCommentsGap)
            .subscribe(data => {

                this.currentPodCommentsGap = data;
                this.commentsGapLabels = data.labels;
                this.commentsGapData = data.dataset;
                this.commentsGapLoading = false;

            });
    }
    
    onGroupChange(value: InstaPodGroup): void {
        this.currentGroup = value;
        
        this.searchComments.idPodGroup = this.currentGroup.idPodGroup;
        this.searchLikes.idPodGroup = this.currentGroup.idPodGroup;
        this.searchCommentsGap.idPodGroup = this.currentGroup.idPodGroup;
        this.updatePodComments();
        this.updatePodLikes();
        this.updatePodCommentsGap();
    }

    compareFn(c1: InstaPodGroup, c2: InstaPodGroup): boolean {
        return c1 && c2 ? c1.groupName === c2.groupName : c1 === c2;
    }
}
