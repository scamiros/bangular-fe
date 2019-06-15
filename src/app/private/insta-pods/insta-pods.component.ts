import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {InstaPodGroup} from '../../_models/instagram/insta-pod-group';
import {InstaPodGroupBean} from '../../_models/instagram/insta-pod-group-bean';
import {InstaPodMember} from '../../_models/instagram/insta-pod-member';
import {InstaPodContent} from '../../_models/instagram/insta-pod-content';
import {InstaPodAction} from '../../_models/instagram/insta-pod-action';
import {InstaPodUser} from '../../_models/instagram/insta-pod-user';
import {InstaPodsService} from './insta-pods.service';
import {InstaPodUsersService} from '../insta-pod-users/insta-pod-users.service';
import {ResponseServer} from '../../_models/response-server';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {InstaPodMemberSelect} from '../../_models/instagram/insta-pod-member-select';

@Component({
    selector: 'app-insta-pods',
    templateUrl: './insta-pods.component.html',
    styleUrls: ['./insta-pods.component.scss']
})
export class InstaPodsComponent implements OnInit {

    instaPodGroupsList: InstaPodGroup[];
    usersList: InstaPodUser[];
    memberList: InstaPodMemberSelect[];
    currentGroup: InstaPodGroup;
    currentGroupBean: InstaPodGroupBean;
    modalrefGroup: any;
    modalrefMember: any;
    modalrefContent: any;
    newGroup: InstaPodGroup;
    selectMember: InstaPodMemberSelect;
    newMember: InstaPodMember;
    newContent: InstaPodContent;
    newAction: InstaPodAction;
    responseServer: ResponseServer;
    public loading = false;

    constructor(private instaPodService: InstaPodsService,
        private instaPodUsersService: InstaPodUsersService,
        private modalService: NgbModal,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.loading = true;
        this.instaPodService.getInstaPodGroups()
            .subscribe(data => {

                this.instaPodGroupsList = data;
                if (this.instaPodGroupsList.length > 0) {
                    this.currentGroup = this.instaPodGroupsList[0];
                    this.getInstaPodGroup(this.currentGroup);
                } else {
                    this.loading = false;
                }
            });
    }

    getInstaPodGroup(value: InstaPodGroup) {

        this.instaPodService.getInstaPodGroup(value)
            .subscribe(data => {
                this.currentGroupBean = data;
                this.loading = false;
            });
    }

    openNewMember(contentMember) {
    
        this.instaPodUsersService.getInstaPodUsersList()
            .subscribe(data => {
                this.usersList = data;
                this.modalrefMember = this.modalService.open(contentMember);
            });
    }
    
    removeMember(member: InstaPodMember) {
    
        this.instaPodService.removeMember(member).subscribe(data => {
            this.responseServer = data;

            if (this.responseServer.code === '200') {
              this.toastr.success(this.responseServer.message);
                
                const index = this.currentGroupBean.members.indexOf(member, 0);
                if (index > -1) {
                   this.currentGroupBean.members.splice(index, 1);
                }
              ;
            } else {
              this.toastr.error(this.responseServer.message);
            }
       });
    }

    openNewGroup(content) {
        this.modalrefGroup = this.modalService.open(content);
    }

    createGroup(newGroupForm: NgForm) {

        this.newGroup = {
            idPodGroup: null,
            groupName: newGroupForm.value.groupName
        };

        this.instaPodService.createGroup(this.newGroup)
            .subscribe(data =>  {
                this.responseServer = data; 

                if (this.responseServer.code === '200') {
                    this.toastr.success(this.responseServer.message);
                    this.modalrefGroup.close();
                    this.getInstaPodGroup(this.currentGroup);
                } else {
                    this.toastr.error(this.responseServer.message);
                }
            });
    }
    createMember(newMemberForm: NgForm) {

        this.newMember = {
            idPodMember: null,
            instagramPodUser: newMemberForm.value.instagramPodUser,
            instagramPodGroup: this.currentGroup
        };

        this.instaPodService.createMember(this.newMember)
            .subscribe(data => {
                this.responseServer = data;

                if (this.responseServer.code === '200') {
                    this.toastr.success(this.responseServer.message);
                    this.modalrefMember.close();
                    this.getInstaPodGroup(this.currentGroup);
                } else {
                    this.toastr.error(this.responseServer.message);
                }
            });
    }

    postLike(value: InstaPodAction) {

        this.newAction = {
            idPodAction: value.idPodAction,
            comment: value.comment,
            like: 1,
            instagramPodContent: value.instagramPodContent,
            instagramPodMember: value.instagramPodMember
        };

        this.instaPodService.postPodAction(this.newAction)
            .subscribe(data => {
                this.responseServer = data;

                if (this.responseServer.code === '200') {
                    this.toastr.success(this.responseServer.message);
                    this.getInstaPodGroup(this.currentGroup);
                } else {
                    this.toastr.error(this.responseServer.message);
                }
            });
    }

    postComment(value: InstaPodAction) {

        this.newAction = {
            idPodAction: value.idPodAction,
            comment: 1,
            like: value.like,
            instagramPodContent: value.instagramPodContent,
            instagramPodMember: value.instagramPodMember
        };

        this.instaPodService.postPodAction(this.newAction)
            .subscribe(data => {
                this.responseServer = data;

                if (this.responseServer.code === '200') {
                    this.toastr.success(this.responseServer.message);
                    this.getInstaPodGroup(this.currentGroup);
                } else {
                    this.toastr.error(this.responseServer.message);
                }
            });
    }

    openNewContent(contentContent) {

        this.memberList = new Array();
        for (let member of this.currentGroupBean.members) {
            this.selectMember = {
                idPodMember: member.idPodMember,
                username: member.instagramPodUser.username, 
                profilePicture: member.instagramPodUser.profilePicture
            };
            
            this.memberList.push(this.selectMember);
        } 
        
        this.modalrefContent = this.modalService.open(contentContent);
    }
    
    createContent(newContentForm: NgForm) {

        this.newMember = {
            idPodMember: newContentForm.value.instagramPodMember,
            instagramPodUser: null,
            instagramPodGroup: this.currentGroup
        };

        this.newContent = {
            idPodContent: null,
            dtPosted: newContentForm.value.dtPosted,
            contentUri: newContentForm.value.contentUri,
            instagramPodMember: this.newMember,
            comments: 0,
            likes: 0
        };

        this.instaPodService.createContent(this.newContent)
            .subscribe(data => {
                this.responseServer = data;

                if (this.responseServer.code === '200') {
                    this.toastr.success(this.responseServer.message);
                    this.modalrefContent.close();
                    this.getInstaPodGroup(this.currentGroup);
                } else {
                    this.toastr.error(this.responseServer.message);
                }
            });
    }

    onGroupChange(value: InstaPodGroup): void {
        this.loading = true;
        this.currentGroup = value;

        this.getInstaPodGroup(value);

    }

    compareFn(c1: InstaPodGroup, c2: InstaPodGroup): boolean {
        return c1 && c2 ? c1.groupName === c2.groupName : c1 === c2;
    }
}
