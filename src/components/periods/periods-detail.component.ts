import { Component } from '@angular/core';
import {RouteSegment, Router, OnActivate, RouteTree} from '@angular/router';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon} from '@angular2-material/icon';
import { NotificationService } from '../../services/notification.service';

import {AbstractAssetDetailComponent} from '../abstract-asset-detail.component';

import {PeriodsService} from '../../services/periods.service';
import {PeriodsHierarchy} from '../../models/periods-hierarchy';


@Component({
    moduleId: module.id,
    selector: 'periods-detail',
    template: require('./periods-detail.component.html'),
    styles: [require('./periods-detail.component.css')],
    directives: [
        MD_LIST_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon
    ],
    providers: [
    ]
})
export class PeriodsDetailComponent extends AbstractAssetDetailComponent<PeriodsHierarchy>{

    constructor(router: Router, notificationService: NotificationService, periodsService: PeriodsService){
        super(router, notificationService, periodsService);
    }



}
