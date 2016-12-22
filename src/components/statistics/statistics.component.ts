import { Component, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { MdIcon } from '@angular2-material/icon';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import { MdDataTable } from 'ng2-material/components/data-table/index';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';

import { SELECT_DIRECTIVES, Md2SelectDispatcher } from 'md2/select';

import { AbstractAssetsComponent } from '../abstract-assets.component';
import { CoreServices } from '../../services/core-services.service';

import { LeftSidenavContentComponent } from '../shared/left-sidenav-content.component';
import { StatisticsDetailComponent } from './statistics-detail.component';
import { KeyFieldsComponent } from './key-fields.component';

import { StatisticsService } from '../../services/statistics.service';
import { DatasetService } from '../../services/dataset.service';
import { FieldService } from '../../services/field.service';
import { PeriodsService } from '../../services/periods.service';
import { ReferenceService } from '../../services/reference.service';

import { Statistics } from '../../models/statistics';
import { Dataset } from '../../models/dataset';
import { PeriodsHierarchy } from '../../models/periods-hierarchy';

import { TemplateCompiler } from '../../utils/template-compiler';

@Component({
    moduleId: module.id,
    selector: 'statistics',
    template: TemplateCompiler.compile(
        require('../shared/sidenav.template.html'), {
        toolbarTitle:   'Statistics',
        toolbarContent: require('../shared/refresh-and-create-button.fragment.html'),
        content:        require('./statistics.component.html')
    }),
    styles: [require('./statistics.component.css')],
    directives: [
        ROUTER_DIRECTIVES,
        MD_INPUT_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        MdDataTable, MD_SLIDE_TOGGLE_DIRECTIVES,
        SELECT_DIRECTIVES,
        LeftSidenavContentComponent,
        KeyFieldsComponent
    ],
    providers: [
    ],
    precompile: [StatisticsDetailComponent]
})
export class StatisticsComponent extends AbstractAssetsComponent<Statistics> {
    constructor(router: Router, activatedRoute: ActivatedRoute, coreServices: CoreServices,
            statisticsService: StatisticsService, private referenceService: ReferenceService) {
        super(router, activatedRoute, coreServices, statisticsService);
    }

    get refDatasets(): Dataset[] {
        return this.referenceService.datasets;
    }

    get refPeriods(): PeriodsHierarchy[]{
        return this.referenceService.periods;
    }

    refresh() {
        super.refresh();
        this.referenceService.refreshDatasets();
        this.referenceService.refreshPeriods();
    }

    protected resetNewAsset() {
        super.resetNewAsset();
        if (this.newAsset.keyFields == null) {
            this.newAsset.keyFields = [];
        }
    }

}
