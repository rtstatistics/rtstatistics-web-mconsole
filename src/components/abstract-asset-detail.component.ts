import { Component, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from "../models/api-response";
import { NotificationService } from '../services/notification.service';
import { AbstractAssetService } from '../services/abstract-asset.service';
import { Asset } from '../models/asset';
import { AbstractComponent } from './abstract.component';
import { ProgressTracker } from '../utils/progress-tracker';

export class AbstractAssetDetailComponent<T extends Asset> extends AbstractComponent implements AfterViewInit{
    routeSegment: RouteSegment;
    parentRouteSegment: RouteSegment;

    @Input() // this may be null if there is no parent
    parentId: string; 

    @Input() // this may be null if there is no parent
    set progressTracker(tracker: ProgressTracker){
        this._progressTracker = tracker;
    }

    get progressTracker(): ProgressTracker{
        return this._progressTracker;
    }
    
    @Input() // this may be null if there is no parent
    id: string;

    @Input() // this may be null if there is no parent
    detail: T;

    @Input()
    index: number;

    @Input('quitEditing')
    _quitEditing: (i: number)=>void;

    editedDetail: T;

    constructor(
        protected router: Router, 
        protected notificationService: NotificationService,
        protected assetService: AbstractAssetService<T>){
            super();
    }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) : void {
        this.routeSegment = curr;
        this.parentRouteSegment = currTree.parent(curr);
        this.id = curr.getParam('id');
        this.refresh();
    }

    ngAfterViewInit() {
        if (this.routeSegment == null){ // only refresh once
     	    this.refresh();
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
                    this.notificationService.showErrorToast(
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
                    this.notificationService.showSuccessToast('Deleted: ' + name);
                },
                err => {
                    this.notificationService.showErrorToast(
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
                    this.notificationService.showSuccessToast('Updated: ' + name);
                },
                err => {
                    this.notificationService.showErrorToast(
                        'Unabled to update: ' + err.message
                    );
                }
            );
    }

    navigateToParent(){
        this.router.navigate(['../'], this.routeSegment); 
    }

    quitEditing(){
        if (this._quitEditing){
            this._quitEditing(this.index);
        }
    }


}