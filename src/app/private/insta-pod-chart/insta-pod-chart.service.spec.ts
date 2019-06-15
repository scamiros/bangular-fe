import { TestBed, inject } from '@angular/core/testing';

import { InstaPodChartService } from './insta-pod-chart.service';

describe('InstaPodChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstaPodChartService]
    });
  });

  it('should be created', inject([InstaPodChartService], (service: InstaPodChartService) => {
    expect(service).toBeTruthy();
  }));
});
