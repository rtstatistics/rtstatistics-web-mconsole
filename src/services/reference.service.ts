import { Injectable } from '@angular/core';

import {CoreServices} from './core-services.service';
import {DatasetService} from './dataset.service';
import {FieldService} from './field.service';
import {PeriodsService} from './periods.service';

import {Dataset} from '../models/dataset';
import {Field} from '../models/field';
import {PeriodsHierarchy} from '../models/periods-hierarchy';

@Injectable()
export class ReferenceService {
    datasets: Dataset[];
    private isRefreshingDatasets: boolean = false;

    periods: PeriodsHierarchy[];
    private isRefreshingPeriods: boolean = false;

    constructor(private coreServices: CoreServices,
                private datasetService: DatasetService, 
                private fieldService: FieldService,
                private periodsService: PeriodsService) { 
    }

    refreshDatasets(){
        if (this.isRefreshingDatasets){
            return;
        }
        this.datasetService.getAll()
            .subscribe(
                data => {
                    this.datasets = data
                        .map(x=>new Dataset(x.name, x.id))
                        .sort((a, b)=>a.name.localeCompare(b.name));
                },
                err => {
                    this.coreServices.notification.showErrorToast(
                        'Unabled to retrieve list of datasets ' + err.message
                    );
                }
            );
    }
    refreshPeriods(){
        if (this.isRefreshingPeriods){
            return;
        }
        this.periodsService.getAll()
            .subscribe(
                data => {
                    this.periods = data
                        .map(x=>new PeriodsHierarchy(x.id, x.name))
                        .sort((a, b)=>a.name.localeCompare(b.name));
                },
                err => {
                    this.coreServices.notification.showErrorToast(
                        'Unabled to retrieve list of statistics periods hierarchies ' + err.message
                    );
                }
            );
    }
}