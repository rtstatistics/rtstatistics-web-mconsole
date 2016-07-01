import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {MdIcon} from '@angular2-material/icon';
import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';

import {DashboardComponent} from './dashboard/dashboard.component';
import {DatasetsComponent} from './datasets/datasets.component';
import {PeriodsComponent} from './periods/periods.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {UsersComponent} from './users/users.component';
import {OrganizationComponent} from './organization/organization.component';
import {SettingsComponent} from './settings/settings.component';

import {LoginComponent} from './shared/login.component';

import {CoreServices} from '../services/core-services.service';
import {AuthService} from '../services/auth.service';
import {ApiHttp} from '../services/api-http.service';
import {SettingsService} from '../services/settings.service';
import {DatasetService} from '../services/dataset.service';
import {PeriodsService} from '../services/periods.service';
import {UserService} from '../services/user.service';


@Component({
    moduleId: module.id,
    selector: 'mconsole-app',
    template: require('./app.component.html'),
    styles: [], // [require('./app.component.css')],
    directives: [
        ROUTER_DIRECTIVES, MdIcon,
        ToasterContainerComponent,
        LoginComponent
    ],
    providers: [
        AuthService, ApiHttp, SettingsService, 
        CoreServices
    ]
})
@Routes([
  {path: '/dashboard', component: DashboardComponent},
  {path: '/datasets', component: DatasetsComponent},
  {path: '/datasets/...', component: DatasetsComponent},
  {path: '/periods', component: PeriodsComponent},
  {path: '/periods/...', component: PeriodsComponent},
  {path: '/statistics', component: StatisticsComponent},
  {path: '/statistics/...', component: StatisticsComponent},
  {path: '/users', component: UsersComponent},
  {path: '/users/...', component: UsersComponent},
  {path: '/organization', component: OrganizationComponent},
  {path: '/settings', component: SettingsComponent}
])
export class AppComponent implements OnInit, AfterViewInit { 
    toasterConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-center'
    });

    constructor(private router: Router){

    }
    
    ngOnInit(){

    }

    ngAfterViewInit() {
        let url = this.router.routeTree.root.stringifiedUrlSegments;
        if(url == ''){
            this.router.navigate(['/datasets']);
        }
    }
}
