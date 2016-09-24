import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_RADIO_DIRECTIVES} from '@angular2-material/radio';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';
import { CoreServices } from '../../services/core-services.service';

import {AbstractAssetDetailComponent} from '../abstract-asset-detail.component';

import {FieldService} from '../../services/field.service';
import {Field} from '../../models/field';


@Component({
    moduleId: module.id,
    selector: 'field-detail',
    template: require('./field-detail.component.html'),
    styles: [require('./field-detail.component.css')],
    inputs: ['progressTracker', 'parentId', 'id', 'detail', 'index', 'quitFunction'],
    directives: [
        MD_TABS_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES,
        MD_LIST_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        MD_RADIO_DIRECTIVES
    ],
    providers: [
    ]
})
export class FieldDetailComponent extends AbstractAssetDetailComponent<Field>{
    supportedTypes: string[] = Field.ALL_TYPES;

    constructor(router: Router, coreServices: CoreServices, 
        fieldService: FieldService){
        super(router, null, coreServices, fieldService);
        this.editedDetail = new Field(null, null, null, null, null);
    }

}
