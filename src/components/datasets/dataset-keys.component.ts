import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {MdIcon} from '@angular2-material/icon';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_RADIO_DIRECTIVES} from '@angular2-material/radio';
import {MdDataTable} from 'ng2-material/components/data-table/index';

import {AbstractProgressiveComponent} from '../abstract-progressive.component';
import { CoreServices } from '../../services/core-services.service';
import { ApiResponse } from '../../models/api-response';

import {LeftSidenavContentComponent} from '../shared/left-sidenav-content.component';
import {FieldDetailComponent} from './field-detail.component';

import {DatasetService} from '../../services/dataset.service';

import {Dataset} from '../../models/dataset';
import {DatasetKeys} from '../../models/dataset-keys';

@Component({
    moduleId: module.id,
    selector: 'dataset-keys',
    template: require('./dataset-keys.component.html'),
    styles: [require('./dataset-keys.component.css')],
    inputs: ['progressTracker', 'parentId'],
    directives: [
        ROUTER_DIRECTIVES, 
        MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_INPUT_DIRECTIVES,
        MD_SIDENAV_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        MD_RADIO_DIRECTIVES, 
        MdDataTable,
        FieldDetailComponent
    ],
    providers: [
    ]
})
export class DatasetKeysComponent extends AbstractProgressiveComponent implements AfterViewInit{
    parentId: string;   // id of the dataset

    keys: DatasetKeys;
    
    constructor(protected router: Router, protected coreServices: CoreServices, protected datasetService: DatasetService){
        super();
    }

    ngAfterViewInit() {
        this.refresh();
    }

    refresh(){
	    this.startProgress();
	    this.datasetService.getKeys(this.parentId)
	        .finally<ApiResponse<DatasetKeys>>(()=>{
                this.endProgress();
            })
            .subscribe(
                data => {
                    this.keys = data.result;
                },
                err => {
                    this.coreServices.notification.showErrorToast(
                        'Unabled to load keys: ' + err.message
                    );
                }
            );
    }

    regenerate(oldKey: string){
	    this.startProgress();
	    this.datasetService.regenerateKey(this.parentId, oldKey)
	        .finally<ApiResponse<string>>(()=>{
                this.endProgress();
            })
            .subscribe(
                data => {
                    this.replaceKey(oldKey, data.result);
                },
                err => {
                    this.coreServices.notification.showErrorToast(
                        'Unabled to regenerate keys: ' + err.message
                    );
                }
            );
    }


    private replaceKey(oldKey: string, newKey: string){
        if (this.keys != null){
            let keys = this.keys.queryKeys;
            if (keys != null){
                let i = keys.indexOf(oldKey);
                if (i >= 0){
                    keys[i] = newKey;
                    return;
                }
            }
            keys = this.keys.sendKeys;
            if (keys != null){
                let i = keys.indexOf(oldKey);
                if (i >= 0){
                    keys[i] = newKey;
                    return;
                }
            }
        }
    }

}
