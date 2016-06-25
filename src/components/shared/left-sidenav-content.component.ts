import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { MdIcon } from '@angular2-material/icon';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';


@Component({
    moduleId: module.id,
    selector: 'left-sidenav-content',
    template: require('./left-sidenav-content.component.html'),
    styles: [require('./left-sidenav-content.component.css')],
    directives: [
        ROUTER_DIRECTIVES, 
        MdIcon, MD_LIST_DIRECTIVES
    ],
    providers: [
    ]
})
export class LeftSidenavContentComponent {
    userName: string;
    organizationName: string;
}
