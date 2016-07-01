import { Component } from '@angular/core';
import {RouteSegment, Router, OnActivate, RouteTree} from '@angular/router';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon} from '@angular2-material/icon';
import {MD_SLIDE_TOGGLE_DIRECTIVES} from '@angular2-material/slide-toggle';

import { SELECT_DIRECTIVES, Md2SelectDispatcher } from 'md2/select';

import { CoreServices } from '../../services/core-services.service';

import {AbstractAssetDetailComponent} from '../abstract-asset-detail.component';

import {StatisticsService} from '../../services/statistics.service';
import {DatasetService} from '../../services/dataset.service';
import {FieldService} from '../../services/field.service';
import {PeriodsService} from '../../services/periods.service';
import {ReferenceService} from '../../services/reference.service';
import {Statistics} from '../../models/statistics';
import {Dataset} from '../../models/dataset';
import {PeriodsHierarchy} from '../../models/periods-hierarchy';
import {TemplateCompiler} from '../../utils/template-compiler';

@Component({
    moduleId: module.id,
    selector: 'statistics-detail',
    template: TemplateCompiler.compile(
        require('../shared/detail-with-refresh-and-delete-toolbar.template.html'),{
        toolbarTitle:   '',
        content:        require('./statistics-detail.component.html')
    }),
    styles: [require('./statistics-detail.component.css')],
    //inputs: ['progressTracker', 'parentId', 'id', 'quitFunction'],
    directives: [
        MD_INPUT_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_LIST_DIRECTIVES, 
        MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        MD_SLIDE_TOGGLE_DIRECTIVES,
        SELECT_DIRECTIVES
    ],
    providers: [
        DatasetService, FieldService, PeriodsService, StatisticsService, ReferenceService,
        Md2SelectDispatcher
    ]
})
export class StatisticsDetailComponent extends AbstractAssetDetailComponent<Statistics>{
    constructor(router: Router, coreServices: CoreServices, 
            statisticsService: StatisticsService, private referenceService: ReferenceService){
        super(router, coreServices, statisticsService);
    }

    get refDatasets(): Dataset[]{
        return this.referenceService.datasets;
    }

    get refPeriods(): PeriodsHierarchy[]{
        return this.referenceService.periods;
    }

    refresh(){
        super.refresh();
        this.referenceService.refreshDatasets();
        this.referenceService.refreshPeriods();
    }

}
