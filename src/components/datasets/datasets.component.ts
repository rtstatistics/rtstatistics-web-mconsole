import { Component, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router/src/directives/router_outlet';
import { MdIcon } from '@angular2-material/icon';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MdDataTable } from 'ng2-material/components/data-table/index';

import { AbstractAssetsComponent } from '../abstract-assets.component';
import { CoreServices } from '../../services/core-services.service';

import { LeftSidenavContentComponent } from '../shared/left-sidenav-content.component';
import { DatasetDetailComponent } from './dataset-detail.component';

import { DatasetService } from '../../services/dataset.service';

import { Dataset } from '../../models/dataset';

import { TemplateCompiler } from '../../utils/template-compiler';

@Component({
    moduleId: module.id,
    template: TemplateCompiler.compile(
        require('../shared/sidenav.template.html'), {
        toolbarTitle:   'Datasets',
        toolbarContent: require('../shared/refresh-and-create-button.fragment.html'),
        content:        require('./datasets.component.html')
    }),
    styles: [require('./datasets.component.css')],
    directives: [
        ROUTER_DIRECTIVES,
        MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_INPUT_DIRECTIVES,
        MD_SIDENAV_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        MdDataTable,
        LeftSidenavContentComponent
    ],
    providers: [
    ],
    precompile: [DatasetDetailComponent]
})
export class DatasetsComponent extends AbstractAssetsComponent<Dataset> {
    constructor(router: Router, activatedRoute: ActivatedRoute, coreServices: CoreServices, datasetService: DatasetService) {
        super(router, activatedRoute, coreServices, datasetService);
    }
}
