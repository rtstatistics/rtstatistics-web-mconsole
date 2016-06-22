import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {PeriodsHierarchy} from '../models/periods-hierarchy';
import {ApiResponse} from "../models/api-response";
import {AbstractApiService} from './abstract-api.service';
import {SettingsService} from "./settings.service";
import {AbstractAssetService} from './abstract-asset.service';

@Injectable()
export class PeriodsService extends AbstractAssetService<PeriodsHierarchy>{

    constructor(http: ApiHttp, settings: SettingsService){
        super(http, settings);
    }

    protected getBaseUrl(settings: SettingsService): string{
        return settings.manageApiBaseUrl + '/periods';
    }

    convert(obj: any): PeriodsHierarchy{
        return Object.assign(new PeriodsHierarchy(), obj);
    }

}