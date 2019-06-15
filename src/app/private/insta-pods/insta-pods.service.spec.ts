import { TestBed, inject } from '@angular/core/testing';

import { InstaPodsService } from './insta-pods.service';

describe('InstaPodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstaPodsService]
    });
  });

  it('should be created', inject([InstaPodsService], (service: InstaPodsService) => {
    expect(service).toBeTruthy();
  }));
});
