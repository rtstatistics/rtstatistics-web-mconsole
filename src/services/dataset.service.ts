import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ApiHttp } from './api-http.service';
import { Response } from '@angular/http';
import { Dataset } from '../models/dataset';
import { DatasetKeys } from '../models/dataset-keys';
import { SingleKey } from '../models/api-response';
import { AbstractApiService } from './abstract-api.service';
import { SettingsService } from './settings.service';
import { AbstractAssetService } from './abstract-asset.service';
import { AuthService } from './auth.service';

@Injectable()
export class DatasetService extends AbstractAssetService<Dataset> {

    constructor(http: ApiHttp, settings: SettingsService, authService: AuthService) {
        super(http, settings, authService);
    }

    protected getBaseUrl(settings: SettingsService): string {
        return settings.manageApiBaseUrl + '/datasets';
    }

    convert(obj: any): Dataset {
        return obj ==  null ? null : Object.assign(new Dataset(), obj);
    }


    getKeys(id: string): Observable<DatasetKeys> {
        return this.rawGet('/' + id + '/keys')
            .map(r => r == null ? null : Object.assign(new DatasetKeys(), r))
            .share();
    }

    regenerateKey(id: string, oldKey: string): Observable<string> {
        return this.rawPut('/' + id + '/keys/' + oldKey)
            .map(r => r == null ? null : r.key) // r is of type SingleKey
            .share();
    }
}