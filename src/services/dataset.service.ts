import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {Dataset} from '../models/dataset';
import {DatasetKeys} from '../models/dataset-keys';
import {ApiResponse} from '../models/api-response';
import {AbstractApiService} from './abstract-api.service';
import {SettingsService} from './settings.service';
import {AbstractAssetService} from './abstract-asset.service';
import {AuthService} from "./auth.service";

@Injectable()
export class DatasetService extends AbstractAssetService<Dataset>{

    constructor(http: ApiHttp, settings: SettingsService, authService: AuthService){
        super(http, settings, authService);
    }

    protected getBaseUrl(settings: SettingsService): string{
        return settings.manageApiBaseUrl + '/datasets';
    }

    convert(obj: any): Dataset{
        return Object.assign(new Dataset(), obj);
    }


    getKeys(id: string): Observable<ApiResponse<DatasetKeys>>{
        return AbstractApiService.prototype.get.apply(this, ['/' + id + '/keys'])
            .map(r=>{
                if (r != null && r.result != null){
                    r.result = Object.assign(new DatasetKeys(), r.result);
                }
                return r;
            })
            .share();
    }

    regenerateKey(id: string, oldKey: string): Observable<ApiResponse<string>>{
        return AbstractApiService.prototype.put.apply(this, ['/' + id + '/keys/' + oldKey])
            .share();
    }
}