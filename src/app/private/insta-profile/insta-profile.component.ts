import {Component, OnInit} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {InstaUser} from '../../_models/instagram/insta-user';
import {InstaProfileService} from './insta-profile.service';
import {InstaMedia} from '../../_models/instagram/insta-media';

@Component({
  selector: 'app-insta-profile',
  templateUrl: './insta-profile.component.html',
  styleUrls: ['./insta-profile.component.scss']
})
export class InstaProfileComponent implements OnInit {

  instaUsers: InstaUser[];
  currentInstaUser: InstaUser;
  currentForAvatar: InstaUser;
  currentMedia: InstaMedia;

  modalrefMedia: any;

  public noInstausers = false;
  public loading = false;

  constructor(
    private router: Router,
    private instaProfileService: InstaProfileService,
    private modalService: NgbModal) {}

  ngOnInit() {
    this.loading = true;
    this.instaProfileService.getInstaSnap()
      .subscribe(data => {
        if (data.currentIndex === -1) {
          this.noInstausers = true;
          this.loading = false;
        } else {
          this.noInstausers = false;
          this.currentForAvatar = data.list[data.currentIndex];
          this.instaUsers = data.list;

          this.instaProfileService.getInstaProfile()
            .subscribe(data2 => {
              this.currentInstaUser = data2;
              this.loading = false;
            });
        }
      });
  }

  openInstaMedia(content, media: InstaMedia) {
    this.loading = true;  

    this.currentMedia = media;
    this.modalrefMedia = this.modalService.open(content, {size: 'lg', centered: true});
    this.loading = false;

  }

  instaProfile(instaUser: InstaUser) {
    this.router.navigate(['/private/insta.profile'], {skipLocationChange: true});
  }
}
