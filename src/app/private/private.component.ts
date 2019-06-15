import {Component, OnInit} from '@angular/core';
import {PrivateService} from './private.service';
import {SessionUser} from '../_models/index';
import {UserProfile} from '../_models/index';
import {AuthenticationService} from '../_services/index';

import {Router, NavigationEnd} from '@angular/router';
import {navItems} from './_nav';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  user: SessionUser;
  userProfile: UserProfile;
  test: String;
  isAdmin: boolean;
  role: string;

  constructor(
    private adminService: PrivateService,
    private authenticationService: AuthenticationService,
    private router: Router) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.adminService.getUserProfile()
      .subscribe(data => {
        this.userProfile = data
        var role = this.userProfile.role.role;

        if (role == "ROLE_ADMIN") {
          this.isAdmin = true;
          this.role = "Administrator";
        } else if (role == "ROLE_USER") {
          this.isAdmin = false;
          this.role = "User";
        }
      });

    //this.isAdmin = this.authenticationService.isAdmin;
   }

  signOut() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
