import {Component, OnInit} from '@angular/core';

import {NgForm} from '@angular/forms';

import {SecurityService} from './security.service';
import {UserProfile} from '../../_models/index';
import {ProfileService} from '../profile/profile.service';
import {Role} from '../../_models/index';


@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  userProfile: UserProfile;
  roles: Role[];

  submitted = false;

  constructor(private securityService: SecurityService, private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getUserProfile()
      .subscribe(data => this.userProfile = data);

  }

  onSubmit(userProfileForm: NgForm) {
    this.submitted = true;

    this.securityService.updateUserPassword(userProfileForm.value)
      .subscribe();
    // userProfileForm.reset();
  }

}
