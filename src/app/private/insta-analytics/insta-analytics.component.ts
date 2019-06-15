import {Component, OnInit} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {InstaUser} from '../../_models/instagram/insta-user';
import {InstaStatsself} from '../../_models/instagram/insta-statsself';
import {InstaProfileService} from '../insta-profile/insta-profile.service';
import {InstaAnalyticsService} from './insta-analytics.service';

import {ChartsDatas} from '../../_models/charts/charts-datas';
import {ChartsDataset} from '../../_models/charts/charts-dataset';

@Component({
  selector: 'app-insta-analytics',
  templateUrl: './insta-analytics.component.html',
  styleUrls: ['./insta-analytics.component.scss']
})
export class InstaAnalyticsComponent implements OnInit {

  instaUsers: InstaUser[];
  currentForAvatar: InstaUser;
  currentInstaUser: InstaUser;
  currentStatsself: InstaStatsself;

  currentFollowersGro: ChartsDatas;
  followersGroData: ChartsDataset[];
  followersGroLabels: string[];

  currentLikesHistory: ChartsDatas;
  likesHistoryData: ChartsDataset[];
  likesHistoryLabels: string[];
    
  currentCommentsHistory: ChartsDatas;
  commentsHistoryData: ChartsDataset[];
  commentsHistoryLabels: string[];

  periodLabel: string;
  periodFollowersLabel: string;
  periodLikesHistoryLabel: string;
  periodCommentsHistoryLabel: string;

  public noInstausers = false;
  public statsLoading = false;
  public likesHistoryLoading = false;
  public commentsHistoryLoading = false;
  public followersGroLoading = false;

  lineChartOpt = {
    responsive: true,
    ticks: {
      autoSkip: false
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0
        }
      }]
    },
    tooltips: {
      callback: {
        label: function(tooltipItem, data) {
          const label = data.datasets[tooltipItem.datasetIndex].label;
          const dataI = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.datasetIndex];
          return label + ': ' + dataI + 'Lux';
        }
      }
    }
  };

  public followsGroColors: Array<any> = [{
    backgroundColor: 'rgba(97,192,255,0.5)',
    borderColor: '#61c0ff',
    borderWidth: 2,
    pointBackgroundColor: '#104152',
    pointBorderColor: '#104152',
    pointHoverBackgroundColor: '#104152',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  public likesHistoryColors: Array<any> = [{
    backgroundColor: 'rgba(255,142,166,0.5)',
    borderColor: '#ff8ea6',
    borderWidth: 2,
    pointBackgroundColor: '#a24847',
    pointBorderColor: '#a24847',
    pointHoverBackgroundColor: '#f38382',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
    
  public commentsHistoryColors: Array<any> = [{
    backgroundColor: 'rgba(255,193,7,0.5)',
    borderColor: '#ffc105',
    borderWidth: 2,
    pointBackgroundColor: '#a24847',
    pointBorderColor: '#a24847',
    pointHoverBackgroundColor: '#f38382',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  constructor(
    private router: Router,
    private instaProfileService: InstaProfileService,
    private instaAnalyticsService: InstaAnalyticsService) {}

  ngOnInit() {
    this.statsLoading = true;
    this.followersGroLoading = true;
    this.likesHistoryLoading = true;
    this.commentsHistoryLoading = true;
    this.instaProfileService.getInstaSnap()
      .subscribe(data => {
        if (data.currentIndex === -1) {
          this.noInstausers = true;
          this.statsLoading = false;
        } else {
          this.noInstausers = false;
          this.currentForAvatar = data.list[data.currentIndex];
          this.currentInstaUser = data.list[data.currentIndex];
          this.instaUsers = data.list;
          setTimeout(() => {
            this.updateStats('day');
            this.updateFollowersGro('day');
            this.updateLikesHistory('day');
            this.updateCommentsHistory('day');
          }, 500);

        }
      });
  }

  updateStats(value: string) {

    this.instaAnalyticsService.getInstaUserself(value)
      .subscribe(data => {
        this.periodLabel = value;
        this.currentStatsself = data;
        this.statsLoading = false;
      });

  }

  updateFollowersGro(value: string) {

    this.followersGroLabels = [];
    this.instaAnalyticsService.getInstaStats('followers', value)
      .subscribe(data => {

        this.periodFollowersLabel = value;
        this.currentFollowersGro = data;
        this.followersGroLabels = data.labels;
        this.followersGroData = data.dataset;
        this.followersGroLoading = false;

      });

  }

  updateLikesHistory(value: string) {

    this.likesHistoryLabels = [];
    this.instaAnalyticsService.getInstaStats('likes', value)
      .subscribe(data => {

        this.periodLikesHistoryLabel = value;
        this.currentLikesHistory = data;
        this.likesHistoryLabels = data.labels;
        this.likesHistoryData = data.dataset;
        this.likesHistoryLoading = false;

      });

  }
  
  updateCommentsHistory(value: string) {

    this.commentsHistoryLabels = [];
    this.instaAnalyticsService.getInstaStats('comments', value)
      .subscribe(data => {

        this.periodCommentsHistoryLabel = value;
        this.currentCommentsHistory = data;
        this.commentsHistoryLabels = data.labels;
        this.commentsHistoryData = data.dataset;
        this.commentsHistoryLoading = false;

      });

  }
  instaProfile(instaUser: InstaUser) {
    this.router.navigate(['/private/insta.profile'], {skipLocationChange: true});
  }
}
