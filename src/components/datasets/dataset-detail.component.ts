import { Component, ViewChild, ViewChildren, ContentChildren, AfterViewInit, Query, ViewQuery, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MdIcon } from '@angular2-material/icon';
import { CoreServices } from '../../services/core-services.service';

import { AbstractAssetDetailComponent } from '../abstract-asset-detail.component';
import { DatasetKeysComponent } from './dataset-keys.component';
import { AllFieldsComponent } from './all-fields.component';

import { DatasetService } from '../../services/dataset.service';
import { FieldService } from '../../services/field.service';
import { Dataset } from '../../models/dataset';
import { Field } from '../../models/field';
import { TemplateCompiler } from '../../utils/template-compiler';


@Component({
    moduleId: module.id,
    selector: 'dataset-detail',
    template: TemplateCompiler.compile(
        require('../shared/detail-with-refresh-and-delete-toolbar.template.html'), {
        toolbarTitle:   '',
        content:        require('./dataset-detail.component.html')
    }),
    styles: [require('./dataset-detail.component.css')],
    // inputs: ['progressTracker', 'parentId', 'id', 'quitFunction'],
    directives: [
        MD_TABS_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES,
        MD_LIST_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        DatasetKeysComponent, AllFieldsComponent
    ],
    providers: [
    ]
})
export class DatasetDetailComponent extends AbstractAssetDetailComponent<Dataset> implements AfterViewInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, coreServices: CoreServices,
        datasetService: DatasetService) {
        super(router, activatedRoute, coreServices, datasetService);
    }

    ngAfterViewInit() {
    }

    refresh() {
        super.refresh();
    }

}
