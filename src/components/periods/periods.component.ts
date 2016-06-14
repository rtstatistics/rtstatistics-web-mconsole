import { Component, ViewChild } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, Routes} from '@angular/router';
import {MdIcon} from '@angular2-material/icon';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';

import {AbstractAssetsComponent} from '../abstract-assets.component';

import {LeftSidenavContentComponent} from '../shared/left-sidenav-content.component';
import {PeriodsDetailComponent} from './periods-detail.component';

import {PeriodsService} from '../../services/periods.service';

import {PeriodsHierarchy} from '../../models/periods-hierarchy';

@Component({
    moduleId: module.id,
    selector: 'periods',
    template: require('./periods.component.html'),
    styles: [require('./periods.component.css')],
    directives: [
        ROUTER_DIRECTIVES, 
        MD_SIDENAV_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        LeftSidenavContentComponent
    ],
    providers: [
        PeriodsService
    ]
})
@Routes([
    {path: '/:id', component: PeriodsDetailComponent}
])
export class PeriodsComponent extends AbstractAssetsComponent<PeriodsHierarchy>{

    constructor(router: Router, private periodsService: PeriodsService){
        super(router);
    }

    doGetAll(){
        return this.periodsService.getAll();
    }


}
