import { Observable } from 'rxjs/Observable';
import {Injectable, EventEmitter} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {Asset} from '../models/asset';
import {SingleResult, SingleId, SingleKey} from "../models/api-response";
import {AbstractApiService} from './abstract-api.service';
import {SettingsService} from "./settings.service";
import {AuthService} from "./auth.service";

/**
 * Parent class for the service managing the CRUD of an asset type (e.g. dataset, statistics, dataset field, etc.)
 * 
 * @export
 * @abstract
 * @class AbstractAssetService
 * @extends {AbstractApiService}
 * @template T  type of the asset
 */
@Injectable()
export abstract class AbstractAssetService<T extends Asset> extends AbstractApiService{
    created: EventEmitter<T> = new EventEmitter<T>();
    deleted: EventEmitter<T> = new EventEmitter<T>();
    updated: EventEmitter<T> = new EventEmitter<T>();

    constructor(http: ApiHttp, settings: SettingsService, authService: AuthService){
        super(http, settings, authService);
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


    getAll(parentId?: string) : Observable<T[]> {
        return this.rawGet(parentId == null ? '' : ('/' + parentId + this.getPathSegment()))
            .map(r => r == null ? null : r.map(x => this.convert(x)));
    }

    create(asset: T, parentId?: string): Observable<string>{
        let obs: Observable<string> = this.rawPost(parentId == null ? '' : ('/' + parentId + this.getPathSegment()), asset)
                    .map(r => r == null ? null : r.id)  // retrieve id from SingleId
                    .share();
        obs.subscribe(r=>{
            this.created.emit(Object.assign(asset, {id: r, parentId: parentId}));   // side effect: input argument `asset` modified
        },err=>{
            // needed for error handlers of other subscriptions to be called
        });
        return obs;
    }

    get(id: string, parentId?: string): Observable<T>{
        return this.rawGet('/' + (parentId == null ? id : (parentId + this.getPathSegment() + '/' + id)))
            .map(r => r == null ? null : Object.assign(this.convert(r), {id: id, parentId: parentId}))
            .share();
    }

    delete(id: string, parentId?: string): Observable<any>{
        let obs = this.rawDelete('/' + (parentId == null ? id : (parentId + this.getPathSegment() + '/' + id)))
            .share();
        obs.subscribe(r=>{
            this.deleted.emit(this.convert(new Asset(id, undefined, parentId)));
        },err=>{
            // needed for error handlers of other subscriptions to be called
        });
        return obs;
    }

    /**
     * Partial update
     * 
     * @param {string} id       id of the asset
     * @param {T} asset         partial update for the asset
     * @param {string} [parentId]   parent id of the asset if it is a child asset
     * @returns {Observable<any>}   observable that emmits only a null element
     */
    update(id: string, asset: T, parentId?: string): Observable<any>{
        let obs = this.rawPatch('/' + (parentId == null ? id : (parentId + this.getPathSegment() + '/' + id)), asset)
            .share();
        obs.subscribe(r=>{
            this.updated.emit(Object.assign(asset, {id: id, parentId: parentId}));  // side effect: input argument `asset` modified
        },err=>{
            // needed for error handlers of other subscriptions to be called
        });
        return obs;
    }

    /**
     * Full update/replace
     * 
     * @param {string} id       id of the asset
     * @param {T} asset         new values of the asset
     * @param {string} [parentId]   parent id of the asset if it is a child asset
     * @returns {Observable<any>}   observable that emmits only a null element
     */
    replace(id: string, asset: T, parentId?: string): Observable<any>{
        let obs = this.rawPut('/' + (parentId == null ? id : (parentId + this.getPathSegment() + '/' + id)), asset)
            .share();
        obs.subscribe(r=>{
            this.updated.emit(Object.assign(asset, {id: id, parentId: parentId}));  // side effect: input argument `asset` modified
        },err=>{
            // needed for error handlers of other subscriptions to be called
        });
        return obs;
    }

}