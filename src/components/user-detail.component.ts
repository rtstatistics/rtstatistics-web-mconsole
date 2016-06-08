import { Component } from '@angular/core';
import {RouteSegment} from '@angular/router';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

import {User} from '../models/user';


@Component({
    moduleId: module.id,
    selector: 'user-detail',
    template: 'user detail id={{id}}',
    styles: []
})
export class UserDetailComponent{
    id: string;
    constructor(routeSegment: RouteSegment){
        this.id = routeSegment.getParam('id');
    }
}
