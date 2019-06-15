import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as $ from 'jquery';

import {ProfileService} from './profile.service';
import {UserProfile} from '../../_models/index';
import {Role} from '../../_models/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: UserProfile;
  roles: Role[];

  submitted = false;

  constructor(private profileService: ProfileService) {}


  ngOnInit() {

    this.profileService.getUserProfile()
      .subscribe(data => this.userProfile = data);

    this.profileService.getRoles()
      .subscribe(data => this.roles = data);


  }

  onSubmit(userProfileForm: NgForm) {
    this.submitted = true;

    this.profileService.saveUser(userProfileForm.value)
      .subscribe(data => this.userProfile = data);

  }
}
