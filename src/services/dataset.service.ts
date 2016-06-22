import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {Dataset} from '../models/dataset';
import {ApiResponse} from '../models/api-response';
import {AbstractApiService} from './abstract-api.service';
import {SettingsService} from './settings.service';
import {AbstractAssetService} from './abstract-asset.service';

@Injectable()
export class DatasetService extends AbstractAssetService<Dataset>{

    constructor(http: ApiHttp, settings: SettingsService){
        super(http, settings);
    }

    protected getBaseUrl(settings: SettingsService): string{
        return settings.manageApiBaseUrl + '/datasets';
    }

    convert(obj: any): Dataset{
        return Object.assign(new Dataset(), obj);
    }

}