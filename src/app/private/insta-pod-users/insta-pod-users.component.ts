import { Component, OnInit } from '@angular/core';
import { InstaPodUsersService } from './insta-pod-users.service';
import { ResponseServer } from '../../_models/response-server';
import { NgForm } from '@angular/forms';
import { ToastrService }   from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {InstaPodUser} from '../../_models/instagram/insta-pod-user';
import {InstaPodUserPage} from '../../_models/instagram/insta-pod-user-page';
import {SearchBean} from '../../_models/search-bean';


@Component({
    selector: 'app-insta-pod-users',
    templateUrl: './insta-pod-users.component.html',
    styleUrls: ['./insta-pod-users.component.scss']
})
export class InstaPodUsersComponent implements OnInit {

    public loading = false;
    users: InstaPodUser[];
    usersPage: InstaPodUserPage;
    newUser: InstaPodUser;
    currentUser: InstaPodUser;
    modalrefCreatePodUser: any;
    modalrefDeletePodUser: any;
    responseServer: ResponseServer;
    currentSearch: SearchBean;

    constructor(private instaPodUsersService: InstaPodUsersService,
        private modalService: NgbModal,
        private toastr: ToastrService) { }

    ngOnInit() {
        
        this.currentSearch = {
            search: "",    
            pageNumber: 0,
            pageSize: 10,
            orderField: 'username',
            direction: 'ASC',
        };
        this.getInstaPodUsersList();
    }

    getInstaPodUsersList() {
        
        this.loading = true;
        
        this.instaPodUsersService.getInstaPodUsers(this.currentSearch)
            .subscribe(data => {
                this.usersPage = data;
                this.loading = false; 
            });
    }

    openCreatePodUser(content4) {
        this.currentUser = null;
        this.modalrefCreatePodUser = this.modalService.open(content4);
    }

    openUpdatePodUser(content4, user) {
        this.currentUser = user;
        this.modalrefCreatePodUser = this.modalService.open(content4);
    }

    managePodUser(createPodUserForm: NgForm) {

        this.newUser = {
            idPodUser: (this.currentUser != null) ? this.currentUser.idPodUser : null,
            profilePicture: createPodUserForm.value.profilePicture,
            username: createPodUserForm.value.username
        };

        this.instaPodUsersService.managePodUserService(this.newUser)
            .subscribe(data => {
                this.responseServer = data;

                if (this.responseServer.code == "200") {
                    this.toastr.success(this.responseServer.message);
                    this.modalrefCreatePodUser.close();
                    this.getInstaPodUsersList();
                } else
                    this.toastr.error(this.responseServer.message);
            }
        );
    }

    deletePodUser(podUserForm: NgForm) {
        this.instaPodUsersService.deletePodUser(podUserForm.value)
            .subscribe(data => {
                this.responseServer = data;

                if (this.responseServer.code == "200") {
                    this.toastr.success(this.responseServer.message);
                    this.modalrefDeletePodUser.close();
                    this.getInstaPodUsersList();
                } else
                    this.toastr.error(this.responseServer.message);
            }
            );
    }
    
    onPageChange(page: number) {
        this.currentSearch.pageNumber = page-1;
        this.getInstaPodUsersList();
    }
}
