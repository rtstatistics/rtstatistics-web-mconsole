import { Observable } from 'rxjs/Observable';
import {Injectable, EventEmitter} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {Asset} from '../models/asset';
import {ApiResponse} from "../models/api-response";
import {AbstractApiService} from './abstract-api.service';
import {SettingsService} from "./settings.service";

@Injectable()
export abstract class AbstractAssetService<T extends Asset> extends AbstractApiService{
    created: EventEmitter<T> = new EventEmitter<T>();
    deleted: EventEmitter<T> = new EventEmitter<T>();
    updated: EventEmitter<T> = new EventEmitter<T>();

    constructor(http: ApiHttp, settings: SettingsService){
        super(http, settings);
    }

    /**
     * Return the base URL, for example, '/datasets'
     */
    protected abstract getBaseUrl(settings: SettingsService): string;

    /**
     * Return the path segment that follows the parentId,
     * for example, '/fields'. It can also be null which means
     * there is no parentId in the path.
     */
    protected getPathSegment():string{
        return null;
    }

    /**
     * Convert any object (normally deserialized from JSON) to the target type.
     * The input object will remain unchanged, and a newly created object will be returned.
     */
    abstract convert(obj: any): T;

    getAll(parentId?: string) : Observable<ApiResponse<T[]>> {
        return super.get(parentId == null ? '' : ('/' + parentId + this.getPathSegment()))
            .map(r=>{
                if (r != null && r.result != null){
                    r.result = r.result.map(t=>this.convert(t));
                }
                return r;
            });
    }

    create(asset: T, parentId?: string): Observable<ApiResponse<string>>{
        let obs = super.post(parentId == null ? '' : ('/' + parentId + this.getPathSegment()), asset)
                    .share();
        obs.subscribe(r=>{
           this.created.emit(Object.assign(asset, {id: r.result, parentId: parentId}));
        });
        return obs;
    }

    get(id: string, parentId?: string): Observable<ApiResponse<T>>{
        return super.get('/' + (parentId == null ? id : (parentId + this.getPathSegment() + '/' + id)))
            .map(r=>Object.assign(this.convert(r), {id: r.result, parentId: parentId}))
            .share();
    }

    delete(id: string, parentId?: string): Observable<ApiResponse<any>>{
        let obs = super.delete('/' + (parentId == null ? id : (parentId + this.getPathSegment() + '/' + id)))
            .share();
        obs.subscribe(r=>{
            this.deleted.emit(this.convert(new Asset(id, undefined, parentId)));
        });
        return obs;
    }

    update(id: string, asset: T, parentId?: string): Observable<ApiResponse<any>>{
        let obs = super.update('/' + (parentId == null ? id : (parentId + this.getPathSegment() + '/' + id)), asset)
            .share();
        obs.subscribe(r=>{
            this.updated.emit(Object.assign(asset, {id: id, parentId: parentId}));
        });
        return obs;
    }
}