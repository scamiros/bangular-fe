import { TestBed, inject } from '@angular/core/testing';

import { InstaAnalyticsService } from './insta-analytics.service';

describe('InstaAnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstaAnalyticsService]
    });
  });

  it('should be created', inject([InstaAnalyticsService], (service: InstaAnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
