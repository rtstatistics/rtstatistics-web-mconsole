import { ApiHttp } from '../services/api-http.service';
import { AuthService } from '../services/auth.service';
import { CoreServices } from '../services/core-services.service';
import { DatasetService } from '../services/dataset.service';
import { FieldService } from '../services/field.service';
import { PeriodsService } from '../services/periods.service';
import { ReferenceService } from '../services/reference.service';
import { SettingsService } from '../services/settings.service';
import { StatisticsService } from '../services/statistics.service';
import { UserService } from '../services/user.service';
import { DatasetsComponent } from './datasets/datasets.component';
import { PeriodsComponent } from './periods/periods.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './shared/login.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UsersComponent } from './users/users.component';
import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { MdIcon } from '@angular2-material/icon';
import { ToasterConfig, ToasterContainerComponent } from 'angular2-toaster/angular2-toaster';
import { Md2SelectDispatcher } from 'md2/select';





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
        CoreServices, ReferenceService,
        DatasetService, FieldService, PeriodsService, StatisticsService,
        UserService,
        Md2SelectDispatcher
    ],
    precompile: [SettingsComponent, DatasetsComponent, PeriodsComponent, StatisticsComponent, UsersComponent]
})
export class AppComponent implements OnInit {
    toasterConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-center'
    });

    constructor(private router: Router) {

    }

    ngOnInit() {

    }

}
