import { Component } from '@angular/core';
import {RouteSegment, Router, OnActivate, RouteTree} from '@angular/router';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';
import { NotificationService } from '../../services/notification.service';

import {AbstractAssetDetailComponent} from '../abstract-asset-detail.component';

import {DatasetService} from '../../services/dataset.service';
import {FieldService} from '../../services/field.service';
import {Dataset} from '../../models/dataset';
import {Field} from '../../models/field';
import { ApiResponse } from '../../models/api-response';


@Component({
    moduleId: module.id,
    selector: 'dataset-detail',
    template: require('./dataset-detail.component.html'),
    styles: [require('./dataset-detail.component.css')],
    directives: [
        MD_TABS_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES,
        MD_LIST_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon
    ],
    providers: [
        FieldService
    ]
})
export class DatasetDetailComponent extends AbstractAssetDetailComponent<Dataset>{

    fields: Field[];
    isNewFieldFormActive: boolean = false;

    constructor(router: Router, notificationService: NotificationService, 
        datasetService: DatasetService, private fieldService: FieldService){
        super(router, notificationService, datasetService);
        this.editedDetail = new Dataset(null, null);
    }

    refresh(){
        super.refresh();
        Object.assign(this.editedDetail, this.detail);
        this.refreshFields();
    }

    doGetAllFields(){
        return this.fieldService.getAll(this.id);
    }

    refreshFields(){
        this.inProgressCount ++;
        this.doGetAllFields()
            .finally<ApiResponse<Field[]>>(()=>{
                this.inProgressCount --;
            })
            .subscribe(
                data => {
                    this.fields = data.result;
                },
                err => {
                    this.notificationService.showErrorToast(
                            'Unabled to load or refresh fields: ' + err.message
                        );
                }
            );
    }

    createField(name: string, type: string, path: string, formular: string){
        this.isNewFieldFormActive = false;
    }

}
