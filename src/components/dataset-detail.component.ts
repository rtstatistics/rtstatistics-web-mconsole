import { Component } from '@angular/core';
import {RouteSegment} from '@angular/router';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

import {Dataset} from '../models/dataset';


@Component({
    moduleId: module.id,
    selector: 'dataset-detail',
    template: 'dataset detail: id={{id}}',
    styles: []
})
export class DatasetDetailComponent{
    id: string;
    constructor(routeSegment: RouteSegment){
        this.id = routeSegment.getParam('id');
    }
}
