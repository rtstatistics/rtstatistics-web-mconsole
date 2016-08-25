import { Component, ViewChild } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {MdIcon} from '@angular2-material/icon';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MdDataTable} from 'ng2-material/components/data-table/index';

import {AbstractAssetsComponent} from '../abstract-assets.component';
import { CoreServices } from '../../services/core-services.service';

import {LeftSidenavContentComponent} from '../shared/left-sidenav-content.component';
import {UserDetailComponent} from './user-detail.component';

import {UserService} from '../../services/user.service';

import {User} from '../../models/user';

import {TemplateCompiler} from '../../utils/template-compiler';

@Component({
    moduleId: module.id,
    selector: 'users',
    template: TemplateCompiler.compile(
        require('../shared/sidenav.template.html'),{
        toolbarTitle:   'Users',
        toolbarContent: '',
        content:        require('./users.component.html')
    }),
    styles: [require('./users.component.css')],
    directives: [
        ROUTER_DIRECTIVES, 
        MD_SIDENAV_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        MdDataTable,
        LeftSidenavContentComponent
    ],
    providers: [
        UserService
    ]
})
export class UsersComponent extends AbstractAssetsComponent<User>{

    constructor(router: Router, activatedRoute: ActivatedRoute, coreServices: CoreServices, userService: UserService){
        super(router, activatedRoute, coreServices, userService);
    }



}
