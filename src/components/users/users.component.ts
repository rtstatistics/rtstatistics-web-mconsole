import { Component, ViewChild } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, Routes} from '@angular/router';
import {MdIcon} from '@angular2-material/icon';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';

import {AbstractAssetsComponent} from '../abstract-assets.component';

import {LeftSidenavContentComponent} from '../shared/left-sidenav-content.component';
import {UserDetailComponent} from './user-detail.component';

import {UserService} from '../../services/user.service';

import {User} from '../../models/user';

@Component({
    moduleId: module.id,
    selector: 'users',
    template: require('./users.component.html'),
    styles: [require('./users.component.css')],
    directives: [
        ROUTER_DIRECTIVES, 
        MD_SIDENAV_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        LeftSidenavContentComponent
    ],
    providers: [
    ]
})
@Routes([
    {path: '/:id', component: UserDetailComponent}
])
export class UsersComponent extends AbstractAssetsComponent<User>{

    constructor(router: Router, private userService: UserService){
        super(router);
    }

    doGetAll(){
        return this.userService.getAll();
    }


}
