import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { MdIcon } from '@angular2-material/icon';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';

import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {Organization} from '../../models/organization';


@Component({
    moduleId: module.id,
    selector: 'left-sidenav-content',
    template: require('./left-sidenav-content.component.html'),
    styles: [require('./left-sidenav-content.component.css')],
    directives: [
        ROUTER_DIRECTIVES, 
        MdIcon, MD_LIST_DIRECTIVES
    ],
    providers: [
    ]
})
export class LeftSidenavContentComponent {
    constructor(protected authService: AuthService){

    }

    get currentUser(): User{
        return this.authService.currentUser;
    }

    get currentOrganization(): Organization{
        return this.authService.currentOrganization;
    }

    /**
     * Name of the current organization if it is different
     * than the name of the current user, or null otherwise.
     * 
     * @readonly
     * @type {string}
     */
    get currentOrganizationNameIfDifferentThanUserName(): string{
        let orgName = this.currentOrganization == null ? null : this.currentOrganization.name;
        if (orgName != null && (this.currentUser == null || orgName != this.currentUser.name)){
            return orgName;
        }else{
            return null;
        }
    }

}
