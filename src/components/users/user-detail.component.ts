import { Component } from '@angular/core';
import {RouteSegment, Router, OnActivate, RouteTree} from '@angular/router';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon} from '@angular2-material/icon';

import {AbstractAssetDetailComponent} from '../abstract-asset-detail.component';

import {UserService} from '../../services/user.service';
import {User} from '../../models/user';


@Component({
    moduleId: module.id,
    selector: 'user-detail',
    template: require('./user-detail.component.html'),
    styles: [require('./user-detail.component.css')],
    directives: [
        MD_LIST_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon
    ],
    providers: [
    ]
})
export class UserDetailComponent extends AbstractAssetDetailComponent<User>{

    constructor(private userService: UserService){
        super();
    }

    doGetDetail(){
        return this.userService.get(this.id);
    }

    doDelete(){
        return null;
    }

}
