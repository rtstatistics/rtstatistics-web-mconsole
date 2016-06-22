import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from "../models/api-response";
import { NotificationService } from '../services/notification.service';
import { AbstractAssetService } from '../services/abstract-asset.service';
import { Asset } from '../models/asset';
import { AbstractComponent } from './abstract.component';

export class AbstractAssetDetailComponent<T extends Asset> extends AbstractComponent{
    routeSegment: RouteSegment;
    parentRouteSegment: RouteSegment;
    id: string;
    detail: T;
    editedDetail: T;

    protected inProgressCount: number = 0;
    get isInProgress(){
        return this.inProgressCount > 0;
    }

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

    protected doGetDetail(): Observable<ApiResponse<T>>{
        return this.assetService.get(this.id);
    }

    protected doDelete(): Observable<ApiResponse<any>>{
        return this.assetService.delete(this.id);
    }

    protected doUpdate(newDetail: T): Observable<ApiResponse<any>>{
        return this.assetService.update(this.id, newDetail, this.detail.parentId);
    }

    resetEditedDetail(){
        this.editedDetail = this.assetService.convert(this.detail);
    }

    updateDetail(){
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
                        'Unabled to load or refresh: ' + err.message
                    );
                }
            );
    }

    delete(){
        this.startProgress();
        this.doDelete()
            .finally<ApiResponse<any>>(()=>{
                this.endProgress();
            })
            .subscribe(
                data => {
                },
                err => {
                    this.notificationService.showErrorToast(
                        'Unabled to delete: ' + err.message
                    );
                }
            );
    }

    saveEditedDetail(){
	    this.startProgress();
	    this.doUpdate(this.editedDetail)
	        .finally<ApiResponse<any>>(()=>{
                this.endProgress();
            })
            .subscribe(
                data => {
                    this.updateDetail();
                },
                err => {
                    this.notificationService.showErrorToast(
                        'Unabled to save: ' + err.message
                    );
                }
            );
    }

    navigateBack(){
        this.router.navigate(['../'], this.routeSegment); 
    }

}