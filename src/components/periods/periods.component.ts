import { Component, ViewChild } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {MdIcon} from '@angular2-material/icon';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MdDataTable} from 'ng2-material/components/data-table/index';

import {AbstractAssetsComponent} from '../abstract-assets.component';
import { CoreServices } from '../../services/core-services.service';

import {LeftSidenavContentComponent} from '../shared/left-sidenav-content.component';
import {PeriodsDetailComponent} from './periods-detail.component';
import {PeriodComponent} from './period.component';

import {PeriodsService} from '../../services/periods.service';

import {PeriodsHierarchy, Period} from '../../models/periods-hierarchy';

import {TemplateCompiler} from '../../utils/template-compiler';

@Component({
    moduleId: module.id,
    selector: 'periods',
    template: TemplateCompiler.compile(
        require('../shared/sidenav.template.html'),{
        toolbarTitle:   'Statistics Periods Hierarchies',
        toolbarContent: require('../shared/refresh-and-create-button.fragment.html'),
        content:        require('./periods.component.html')
    }),
    styles: [require('./periods.component.css')],
    directives: [
        ROUTER_DIRECTIVES, 
        MD_INPUT_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        MdDataTable,
        LeftSidenavContentComponent,
        PeriodComponent
    ],
    providers: [
        PeriodsService
    ],
    precompile: [PeriodsDetailComponent]
})
export class PeriodsComponent extends AbstractAssetsComponent<PeriodsHierarchy>{

    constructor(router: Router, activatedRoute: ActivatedRoute, coreServices: CoreServices, periodsService: PeriodsService){
        super(router, activatedRoute, coreServices, periodsService);
    }

    protected resetNewAsset(){
        super.resetNewAsset();
    }


    create(periods: Period[]){
        this.newAsset.periods = periods;
        super.doCreate();
    }

}
