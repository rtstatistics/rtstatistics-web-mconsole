import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { MdIcon } from '@angular2-material/icon';


@Component({
    moduleId: module.id,
    selector: 'left-sidenav-content',
    template: require('./left-sidenav-content.component.html'),
    styles: [require('./left-sidenav-content.component.css')],
    directives: [
        ROUTER_DIRECTIVES, MdIcon
    ],
    providers: [
    ]
})
export class LeftSidenavContentComponent { 
}
