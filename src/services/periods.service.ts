import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {PeriodsHierarchy} from '../models/periods-hierarchy';
import {AbstractApiService} from './abstract-api.service';
import {SettingsService} from "./settings.service";
import {AbstractAssetService} from './abstract-asset.service';
import {AuthService} from "./auth.service";

@Injectable()
export class PeriodsService extends AbstractAssetService<PeriodsHierarchy>{

    constructor(http: ApiHttp, settings: SettingsService, authService: AuthService){
        super(http, settings, authService);
    }

    protected getBaseUrl(settings: SettingsService): string{
        return settings.manageApiBaseUrl + '/periods';
    }

    convert(obj: any): PeriodsHierarchy{
        if (obj == null){
            return obj;
        }else if(typeof obj === 'PeriodsHierarchy'){
            return (<PeriodsHierarchy>obj).copy();
        }else{
            return Object.assign(new PeriodsHierarchy(), obj).copy();
        }
    }

}