import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ApiHttp } from './api-http.service';
import { Response } from '@angular/http';
import { Statistics } from '../models/statistics';
import { AbstractApiService } from './abstract-api.service';
import { SettingsService } from './settings.service';
import { AbstractAssetService } from './abstract-asset.service';
import { AuthService } from './auth.service';

@Injectable()
export class StatisticsService extends AbstractAssetService<Statistics> {

    constructor(http: ApiHttp, settings: SettingsService, authService: AuthService) {
        super(http, settings, authService);
    }

    protected getBaseUrl(settings: SettingsService): string {
        return settings.manageApiBaseUrl + '/statistics';
    }

    convert(obj: any): Statistics {
        if (obj == null) {
            return obj;
        }else if (typeof obj === 'Statistics') {
            return (<Statistics>obj).copy();
        }else {
            return Object.assign(new Statistics(), obj).copy();
        }
    }

}