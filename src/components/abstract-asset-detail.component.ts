import { Component, ViewChild, Input, AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiResponse } from "../models/api-response";
import { CoreServices } from '../services/core-services.service';
import { AbstractAssetService } from '../services/abstract-asset.service';
import { Asset } from '../models/asset';
import { AbstractProgressiveComponent } from './abstract-progressive.component';
import { ProgressTracker } from '../utils/progress-tracker';

/**
 * Component that manages the detail of an asset.
 * 
 * @export
 * @class AbstractAssetDetailComponent
 * @extends {AbstractProgressiveComponent}
 * @implements {AfterViewInit}
 * @template T  type of the asset
 */
export class AbstractAssetDetailComponent<T extends Asset> 
    extends AbstractProgressiveComponent implements OnInit{

    /**
     * ID of the parent asset.
     * It is not injected/set if there is no parent asset.
     * 
     * @type {string}
     */
    parentId: string; 

    /**
     * ID of the asset.
     * 
     * @type {string}
     */
    id: string;

    /**
     * The asset
     * 
     * @type {T}    type of the asset
     */
    detail: T;

    /**
     * Index of the asset in the list of assets managed by parent component.
     * It is not injected/set if the parent component does not want to track this.
     * 
     * @type {number}
     */
    index: number;

    /**
     * Callback function injected from the parent component for quiting asset detail/editing.
     * It is not injected/set if the parent component does not want to provide this kind of callback.
     * 
     * @type {(i?: number)=>void}
     */
    quitFunction: (i?: number)=>void;

    /**
     * Copy of the asset that can be modified.
     * 
     * @type {T}    type of the asset
     */
    editedDetail: T;

    constructor(
        protected router: Router, 
        protected activatedRoute: ActivatedRoute,
        protected coreServices: CoreServices,
        protected assetService: AbstractAssetService<T>){
            super();
            this.editedDetail = assetService.convert({});
    }

    ngOnInit() {
        if (this.activatedRoute != null){
            this.activatedRoute.params
                .map(params => params['id'])
                .subscribe(id => {
                    this.id = id
                    this.refresh();
                });
        }else{
            this.resetEditedDetail();
        }
    }

    protected doGetDetail(): Observable<ApiResponse<T>>{
        return this.assetService.get(this.id, this.parentId);
    }

    protected doDelete(): Observable<ApiResponse<any>>{
        return this.assetService.delete(this.id, this.parentId);
    }

    protected doUpdate(newDetail: T): Observable<ApiResponse<any>>{
        return this.assetService.update(this.id, newDetail, this.parentId);
    }

    resetEditedDetail(){
        this.editedDetail = this.assetService.convert(this.detail);
    }

    syncEditedDetail(){
        this.detail = this.assetService.convert(this.editedDetail);
    }

    refresh(){
	    this.startProgress();
	    this.doGetDetail()
	        .finally<ApiResponse<T>>(()=>{
                this.endProgress();
            })
            .subscribe(
                data => {
                    this.detail = data.result;
                    this.resetEditedDetail();
                },
                err => {
                    this.coreServices.notification.showErrorToast(
                        'Unabled to load details: ' + err.message
                    );
                }
            );
    }

    delete(){
        let name = this.detail.name;
        this.startProgress();
        this.doDelete()
            .finally<ApiResponse<any>>(()=>{
                this.endProgress();
            })
            .subscribe(
                data => {
                    this.coreServices.notification.showSuccessToast('Deleted: ' + name);
                },
                err => {
                    this.coreServices.notification.showErrorToast(
                        'Unabled to delete: ' + err.message
                    );
                }
            );
    }

    update(){
        let name = this.editedDetail.name;
	    this.startProgress();
	    this.doUpdate(this.editedDetail)
	        .finally<ApiResponse<any>>(()=>{
                this.endProgress();
            })
            .subscribe(
                data => {
                    this.syncEditedDetail();
                    this.coreServices.notification.showSuccessToast('Updated: ' + name);
                },
                err => {
                    this.coreServices.notification.showErrorToast(
                        'Unabled to update: ' + err.message
                    );
                }
            );
    }

    navigateToParent(){
        this.router.navigate(['../'], {relativeTo: this.activatedRoute}); 
    }

    quitThis(){
        if (this.quitFunction){
            this.quitFunction(this.index);
        }else if (this.router && this.activatedRoute){
            this.navigateToParent();
        }
    }


}