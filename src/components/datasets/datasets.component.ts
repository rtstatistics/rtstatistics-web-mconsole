import { Component, ViewChild } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, Routes} from '@angular/router';
import {MdIcon} from '@angular2-material/icon';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

import {AbstractAssetsComponent} from '../abstract-assets.component';
import { NotificationService } from '../../services/notification.service';

import {LeftSidenavContentComponent} from '../shared/left-sidenav-content.component';
import {DatasetDetailComponent} from './dataset-detail.component';

import {DatasetService} from '../../services/dataset.service';

import {Dataset} from '../../models/dataset';

@Component({
    moduleId: module.id,
    selector: 'datasets',
    template: require('./datasets.component.html'),
    styles: [require('./datasets.component.css')],
    directives: [
        ROUTER_DIRECTIVES, 
        MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_INPUT_DIRECTIVES,
        MD_SIDENAV_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        LeftSidenavContentComponent
    ],
    providers: [
        DatasetService
    ]
})
@Routes([
    {path: '/:id', component: DatasetDetailComponent}
])
export class DatasetsComponent extends AbstractAssetsComponent<Dataset>{

    isNewDatasetFormActive: boolean = false;

    constructor(router: Router, notificationService: NotificationService, datasetService: DatasetService){
        super(router, notificationService, datasetService);
        this.setupDefaultAssetChangeHandler(datasetService);
    }

    create(name: string){
        this.assetService.create(new Dataset(name)).subscribe(
            response => {
                this.notificationService.showSuccessToast('Dataset created with ID: ' + response.result);
                this.isNewDatasetFormActive = false;
                this.refresh();
            },
            err => {
                this.notificationService.showErrorToast(
                            'Unabled to create: ' + err.message
                        );
            }
        );
        
    }

}
