import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from '../models/api-response';
import { Asset } from '../models/asset';
import { NotificationService } from '../services/notification.service';
import { AbstractAssetService } from '../services/abstract-asset.service';
import { AbstractComponent } from './abstract.component';

export class AbstractAssetsComponent<T extends Asset> extends AbstractComponent implements OnActivate{
    routeSegment: RouteSegment;

    assets: T[];
    isDetailVisible = false;

    protected createdSubscription:any;
    protected updatedSubscription:any;
    protected deletedSubscription:any;


    constructor(
        protected router: Router, 
        protected notificationService: NotificationService,
        protected assetService: AbstractAssetService<T>){
            super();
            this.setupDefaultAssetChangeHandler();
    }

    protected doGetAll():Observable<ApiResponse<T[]>>{
        return this.assetService.getAll();
    }


    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) : void {
        this.routeSegment = curr;
        this.refresh();
        this.isDetailVisible = false;
    }


    protected setupDefaultAssetChangeHandler(){
        this.createdSubscription = this.assetService.created.subscribe(asset=>{
            this.refresh();
        });
        this.updatedSubscription = this.assetService.updated.subscribe(asset=>{
            this.refresh();
        });
        this.deletedSubscription = this.assetService.deleted.subscribe(asset=>{
            this.refresh();
            this.navigateBack();
        });
    }

    protected disposeAssetChangeHandler(){
        if (this.createdSubscription != null){
            this.createdSubscription.dispose();
        }
        if (this.updatedSubscription != null){
            this.updatedSubscription.dispose();
        }
        if (this.deletedSubscription != null){
            this.deletedSubscription.dispose();
        }
    }

    ngOnDestroy(){
        this.disposeAssetChangeHandler();
    }

    refresh(){
	    this.startProgress();
  	    this.doGetAll()
	        .finally<ApiResponse<T[]>>(()=>{
          	    this.endProgress();
   	        })
            .subscribe(
                data => {
                    this.assets = data.result.sort((a, b)=>a.name.localeCompare(b.name));
                },
                err => {
                    this.notificationService.showErrorToast(
                        'Unabled to load or refresh: ' + err.message
                    );
                }
            );
    }

    navigateBack(){
        this.router.navigate(['./'], this.routeSegment);
        this.isDetailVisible = false;
    }


}