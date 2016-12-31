import { Component, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { MdIcon } from '@angular2-material/icon';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_RADIO_DIRECTIVES } from '@angular2-material/radio';
import { MdDataTable } from 'ng2-material/components/data-table/index';

import { AbstractAssetsComponent } from '../abstract-assets.component';
import { CoreServices } from '../../services/core-services.service';

import { LeftSidenavContentComponent } from '../shared/left-sidenav-content.component';
import { FieldDetailComponent } from './field-detail.component';

import { FieldService } from '../../services/field.service';

import { Dataset } from '../../models/dataset';
import { Field } from '../../models/field';

@Component({
    moduleId: module.id,
    selector: 'all-fields',
    template: require('./all-fields.component.html'),
    styles: [require('./all-fields.component.css')],
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
export class AllFieldsComponent extends AbstractAssetsComponent<Field> {
    supportedTypes: string[] = Field.ALL_TYPES;

    constructor(router: Router, coreServices: CoreServices, fieldService: FieldService) {
        super(router, null, coreServices, fieldService);
    }

    protected resetNewAsset() {
        super.resetNewAsset();
        this.newAsset.type = Field.TYPE_NATIVE;
    }

    refresh() {
        super.refresh();
        this.toggleEditing(undefined);
    }

}
