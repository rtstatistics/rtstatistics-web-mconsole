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
    isActive: boolean = false;  // switched on and off by router lifecycle hooks

    constructor(
        protected router: Router, 
        protected notificationService: NotificationService,
        protected assetService: AbstractAssetService<T>){
            super();
    }

    protected doGetAll():Observable<ApiResponse<T[]>>{
        return this.assetService.getAll();
    }


    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) : void {
        this.routeSegment = curr;
        this.refresh();
        this.isActive = true;
        this.isDetailVisible = false;
    }

    routerCanDeactivate(currTree?: RouteTree, futureTree?: RouteTree): Promise<boolean>{
        this.isActive = false;
        return Promise.resolve(true);
    }


    protected setupDefaultAssetChangeHandler(assetService: AbstractAssetService<any>){
        assetService.created.subscribe(asset=>this.refresh());
        assetService.updated.subscribe(asset=>this.refresh());
        assetService.deleted.subscribe(asset=>{this.refresh();this.navigateBack()});
    }

    refresh(){
	    this.inProgressCount ++;
  	    this.doGetAll()
	        .finally<ApiResponse<T[]>>(()=>{
          	    this.inProgressCount --;
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