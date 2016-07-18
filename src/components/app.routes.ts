import {provideRouter, RouterConfig} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DatasetsComponent} from './datasets/datasets.component';
import {DatasetDetailComponent} from './datasets/dataset-detail.component';
import {PeriodsComponent} from './periods/periods.component';
import {PeriodsDetailComponent} from './periods/periods-detail.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {StatisticsDetailComponent} from './statistics/statistics-detail.component';
import {UsersComponent} from './users/users.component';
import {OrganizationComponent} from './organization/organization.component';
import {SettingsComponent} from './settings/settings.component';

export const routes: RouterConfig = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'datasets', component: DatasetsComponent, children: [
    {path: ':id', component: DatasetDetailComponent}
  ]},
  {path: 'periods', component: PeriodsComponent, children: [
    {path: ':id', component: PeriodsDetailComponent}
  ]},
  {path: 'statistics', component: StatisticsComponent, children: [
    {path: ':id', component: StatisticsDetailComponent}
  ]},
  {path: 'users', component: UsersComponent},
  {path: 'organization', component: OrganizationComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '', redirectTo: '/settings', pathMatch: 'full'}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];