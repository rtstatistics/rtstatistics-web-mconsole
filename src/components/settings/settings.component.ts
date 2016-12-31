import { Component } from '@angular/core';
import { MdIcon } from '@angular2-material/icon';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

import { LeftSidenavContentComponent } from '../shared/left-sidenav-content.component';

import { SettingsService } from '../../services/settings.service';

@Component({
    moduleId: module.id,
    template: require('./settings.component.html'),
    styles: [require('./settings.component.css')],
    directives: [
        MD_SIDENAV_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_LIST_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        LeftSidenavContentComponent
    ],
    providers: [
    ]
})
export class SettingsComponent {
    constructor(public settings: SettingsService) {

    }
}
