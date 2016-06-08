import { Component } from '@angular/core';
import {Injectable} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

import {Dataset} from '../models/dataset';
import {PeriodsHierarchy} from '../models/periods-hierarchy';
import {User} from '../models/user';

import {DatasetDetailComponent} from './dataset-detail.component';
import {PeriodsDetailComponent} from './periods-detail.component';
import {UserDetailComponent} from './user-detail.component';



@Component({
    moduleId: module.id,
    selector: 'mconsole-app',
    template: require('./home.component.html'),
    styles: [require('./home.component.css')],
    directives: [ROUTER_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MD_LIST_DIRECTIVES, MdIcon],
    providers: [MdIconRegistry]
})
@Routes([
  {path: '/dataset/:id', component: DatasetDetailComponent},
  {path: '/periods/:id', component: PeriodsDetailComponent},
  {path: '/user/:id', component: UserDetailComponent},
])
export class HomeComponent { 
    datasetsExpanded = false;
    periodsExpanded = false;
    usersExpanded = false;
    
    datasets: Dataset[];
    periods: PeriodsHierarchy[];
    users: User[];
    
    datasetsOnToggle(){
        if (this.datasetsExpanded){
            this.datasets = null;
            this.datasetsExpanded = false;
        }else{
            this.datasets = [{id: '1', name: 'dataset 1'}, {id: '2', name: 'dataset 2'}]
            this.datasetsExpanded = true;
        }
    }
    
    periodsOnToggle(){
        if (this.periodsExpanded){
            this.periods = null;
            this.periodsExpanded = false;
        }else{
            this.periods = [{id: '1', name: 'periods 1'}, {id: '2', name: 'periods 2'}]
            this.periodsExpanded = true;
        }
    }

    usersOnToggle(){
        if (this.usersExpanded){
            this.users = null;
            this.usersExpanded = false;
        }else{
            this.users = [{id: '1', name: 'user 1'}, {id: '2', name: 'user 2'}]
            this.usersExpanded = true;
        }
    }

}
