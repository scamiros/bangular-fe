import { TestBed, inject } from '@angular/core/testing';

import { InstaPodUsersService } from './insta-pod-users.service';

describe('InstaPodUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstaPodUsersService]
    });
  });

  it('should be created', inject([InstaPodUsersService], (service: InstaPodUsersService) => {
    expect(service).toBeTruthy();
  }));
});
