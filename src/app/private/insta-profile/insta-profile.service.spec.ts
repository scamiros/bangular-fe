import { TestBed, inject } from '@angular/core/testing';

import { InstaProfileService } from './insta-profile.service';

describe('InstaProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstaProfileService]
    });
  });

  it('should be created', inject([InstaProfileService], (service: InstaProfileService) => {
    expect(service).toBeTruthy();
  }));
});
