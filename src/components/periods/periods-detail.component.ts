import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdIcon } from '@angular2-material/icon';
import { CoreServices } from '../../services/core-services.service';

import { AbstractAssetDetailComponent } from '../abstract-asset-detail.component';

import { PeriodsService } from '../../services/periods.service';
import { PeriodsHierarchy } from '../../models/periods-hierarchy';
import { TemplateCompiler } from '../../utils/template-compiler';
import { OnePeriodComponent } from './one-period.component';

@Component({
    moduleId: module.id,
    selector: 'periods-detail',
    template: TemplateCompiler.compile(
        require('../shared/detail-with-refresh-and-delete-toolbar.template.html'), {
        toolbarTitle:   '',
        content:        require('./periods-detail.component.html')
    }),
    styles: [require('./periods-detail.component.css')],
    // inputs: ['progressTracker', 'parentId', 'id', 'quitFunction'],
    directives: [
        MD_INPUT_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_LIST_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        OnePeriodComponent
    ],
    providers: [
    ]
})
export class PeriodsDetailComponent extends AbstractAssetDetailComponent<PeriodsHierarchy> {

    constructor(router: Router, activatedRoute: ActivatedRoute, coreServices: CoreServices, periodsService: PeriodsService) {
        super(router, activatedRoute, coreServices, periodsService);
    }


}
