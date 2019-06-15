import {Component, OnInit} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {InstaUser} from '../../_models/instagram/insta-user';
import {InstaMedia} from '../../_models/instagram/insta-media';
import {InstaStatsself} from '../../_models/instagram/insta-statsself';
import {InstaProfileService} from '../insta-profile/insta-profile.service';
import {InstaAnalyticsService} from '../insta-analytics/insta-analytics.service';
import {InstaContentService} from './insta-content.service';

import {ChartsDatas} from '../../_models/charts/charts-datas';
import {ChartsDataset} from '../../_models/charts/charts-dataset';

@Component({
  selector: 'app-insta-content',
  templateUrl: './insta-content.component.html',
  styleUrls: ['./insta-content.component.scss']
})
export class InstaContentComponent implements OnInit {

  instaUsers: InstaUser[];
  currentForAvatar: InstaUser;
  currentInstaUser: InstaUser;
  currentStatsself: InstaStatsself;

  currentMediaHistory: ChartsDatas;
  mediaHistoryData: ChartsDataset[];
  mediaHistoryLabels: string[];

  topTenLikesMedia: InstaMedia[];
  topTenCommentsMedia: InstaMedia[];
  lastMedia: InstaMedia;

  periodLabel: string;
  periodMediaHistoryLabel: string;

  public noInstausers = false;
  public mediaHistoryLoading = false;
  public topTenLikesLoading = false;
  public topTenCommentsLoading = false;

  lineChartOpt = {
    responsive: true,
    ticks: {
      autoSkip: false
    },
    tooltips: {
      callback: {
        label: function(tooltipItem, data) {
          const label = data.datasets[tooltipItem.datasetIndex].label;
          const dataI = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.datasetIndex];
          return label + ': ' + dataI + 'Lux';
        }
      }
    },
    scales: {
        yAxes: [ { id: 'y-axis-1', type: 'linear', position: 'left', ticks: { stepSize: 10}} ]
      }
  };

  public chartColors: Array<any> = [{
    backgroundColor: 'rgba(24,125,160,0.5)',
    borderColor: '#187da0',
    pointBackgroundColor: '#104152',
    pointBorderColor: '#104152',
    pointHoverBackgroundColor: '#104152',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  constructor(
    private router: Router,
    private instaProfileService: InstaProfileService,
    private instaAnalyticsService: InstaAnalyticsService,
    private instaContentService: InstaContentService) {}

  ngOnInit() {
    this.mediaHistoryLoading = true;
    this.topTenLikesLoading = true;
    this.topTenCommentsLoading = true;

    this.instaProfileService.getInstaSnap()
      .subscribe(data => {
        if (data.currentIndex === -1) {
          this.noInstausers = true;
        } else {
          this.noInstausers = false;
          this.currentForAvatar = data.list[data.currentIndex];
          this.currentInstaUser = data.list[data.currentIndex];
          this.instaUsers = data.list;
          setTimeout(() => {
            this.updateTopTen();
            this.updateLastMedia();
            this.updateMediaHistory('day');
          }, 500);

        }
      });
  }

  updateTopTen() {

    this.instaContentService.getInstaTopTen('likes')
      .subscribe(data => {

        this.topTenLikesMedia = data.media;
        this.topTenLikesLoading = false;
      });

    this.instaContentService.getInstaTopTen('comments')
      .subscribe(data => {

        this.topTenCommentsMedia = data.media;
        this.topTenCommentsLoading = false;
      });

  }

  updateMediaHistory(value: string) {

    this.mediaHistoryLabels = [];
    this.instaAnalyticsService.getInstaStats('media', value)
      .subscribe(data => {

        this.periodMediaHistoryLabel = value;
        this.currentMediaHistory = data;
        this.mediaHistoryLabels = data.labels;
        this.mediaHistoryData = data.dataset;

        this.mediaHistoryLoading = false;
      });

  }

  updateLastMedia() {
    this.instaContentService.getInstaLastMedia()
      .subscribe(data2 => {
        this.lastMedia = data2;
      });
  }

  instaProfile(instaUser: InstaUser) {
    this.router.navigate(['/private/insta.profile'], {skipLocationChange: true});
  }
}
