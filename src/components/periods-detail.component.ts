import { Component } from '@angular/core';
import {RouteSegment} from '@angular/router';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

import {PeriodsHierarchy} from '../models/periods-hierarchy';


@Component({
    moduleId: module.id,
    selector: 'periods-detail',
    template: 'periods detail id={{id}}',
    styles: [],
    directives: [MD_LIST_DIRECTIVES, MdIcon],
    providers: [MdIconRegistry]
})
export class PeriodsDetailComponent{
    id: string;
    constructor(routeSegment: RouteSegment){
        this.id = routeSegment.getParam('id');
    }
}
