import { Injectable } from '@angular/core';

import {CoreServices} from '../../services/core-services.service';
import {DatasetService} from '../../services/dataset.service';
import {FieldService} from '../../services/field.service';
import {PeriodsService} from '../../services/periods.service';

import {Dataset} from '../../models/dataset';
import {Field} from '../../models/field';
import {PeriodsHierarchy} from '../../models/periods-hierarchy';


export class ReferenceHelper {
    datasets: Dataset[];
    periods: PeriodsHierarchy[];

    constructor(private coreServices: CoreServices,
                private datasetService: DatasetService, 
                private fieldService: FieldService,
                private periodsService: PeriodsService) { 
        this.refresh();
    }

    refresh(){
        this.datasetService.getAll()
            .subscribe(
                data => {
                    this.datasets = data.result.sort((a, b)=>a.name.localeCompare(b.name));
                },
                err => {
                    this.coreServices.notification.showErrorToast(
                        'Unabled to retrieve list of datasets ' + err.message
                    );
                }
            );
        this.periodsService.getAll()
            .subscribe(
                data => {
                    this.periods = data.result.sort((a, b)=>a.name.localeCompare(b.name));
                },
                err => {
                    this.coreServices.notification.showErrorToast(
                        'Unabled to retrieve list of statistics periods hierarchies ' + err.message
                    );
                }
            );
    }
}