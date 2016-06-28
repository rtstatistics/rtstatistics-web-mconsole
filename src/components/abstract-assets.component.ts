import { Component, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from '../models/api-response';
import { Asset } from '../models/asset';
import { CoreServices } from '../services/core-services.service';
import { NotificationService } from '../services/notification.service';
import { AbstractAssetService } from '../services/abstract-asset.service';
import { AbstractProgressiveComponent } from './abstract-progressive.component';
import { ProgressTracker } from '../utils/progress-tracker';

/**
 * Component that manages a list of assets.
 * 
 * @export
 * @class AbstractAssetsComponent
 * @extends {AbstractProgressiveComponent}
 * @implements {OnActivate}
 * @implements {AfterViewInit}
 * @template T  type of the asset
 */
export class AbstractAssetsComponent<T extends Asset> extends AbstractProgressiveComponent implements OnActivate, AfterViewInit{
    protected routeSegment: RouteSegment;

    /**
     * ID of the parent asset.
     * It is not injected/set if there is no parent asset.
     * 
     * @type {string}
     */
    parentId: string; 

    /**
     * Index of the asset in the list that is current in edit
     * 
     * @private
     * @type {number}
     */
    private indexInEdit: number;
    quitEditingFunction: (i: number)=>void = this.quitEditing.bind(this);
    hideDetailFunction: (i?: number)=>void = ()=>this.isDetailActive = false;

    assets: T[];

    /**
     * True will be returned if current component is the leaf in the
     * route tree. False will be returned if current component has at least one
     * child in the route tree.
     * Subclass can override this function
     * if desired.
     * 
     * @type {boolean}
     */
    get isDetailActive(): boolean{
        return this.router.routeTree.children(this.routeSegment).length > 0;
    }
    /**
     * This function is supposed to set the flag but the implementation
     * in this class actually does nothing. Subclass can override this function
     * if desired.
     */
    set isDetailActive(active: boolean){
    }

    private _isCreationFormActive: boolean = false;
    get isCreationFormActive(){
        return this._isCreationFormActive;
    }
    set isCreationFormActive(b: boolean){
        this._isCreationFormActive = b;
        if (b && this.indexInEdit != null){
            this.indexInEdit = null;
        }
    }

    protected createdSubscription:any;
    protected updatedSubscription:any;
    protected deletedSubscription:any;


    constructor(
        protected router: Router, 
        protected coreServices: CoreServices,
        protected assetService: AbstractAssetService<T>){
            super();
            this.setupAssetChangeHandler();
    }

    protected doGetAll():Observable<ApiResponse<T[]>>{
        return this.assetService.getAll(this.parentId);
    }


    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) : void {
        this.routeSegment = curr;
        this.isDetailVisible = false;
        this.refresh();
    }

    ngAfterViewInit() {
        if (this.routeSegment == null){ // only refresh once
            this.refresh();
        }
    }

    /**
     * Setup the subscriptions to asset change events.
     * The default implementation just calls refresh() for each event,
     * and calls navigateToThis() for deleted event.
     * Sub-classes can override this function to setup their own subscriptions.
     * 
     * @protected
     */
    protected setupAssetChangeHandler(){
        this.createdSubscription = this.assetService.created.subscribe(asset=>{
            if (this.parentId == null || asset == null || asset.parentId == null || asset.parentId == this.parentId){
                this.refresh();
            }
        });
        this.updatedSubscription = this.assetService.updated.subscribe(asset=>{
            if (this.parentId == null || asset == null || asset.parentId == null || asset.parentId == this.parentId){
                this.refresh();
            }
        });
        this.deletedSubscription = this.assetService.deleted.subscribe(asset=>{
            if (this.parentId == null || asset == null || asset.parentId == null || asset.parentId == this.parentId){
                this.refresh();
            }
            this.navigateToThis();
        });
    }

    protected disposeAssetChangeHandler(){
        if (this.createdSubscription != null){
            this.createdSubscription.unsubscribe();
            this.createdSubscription = null;
        }
        if (this.updatedSubscription != null){
            this.updatedSubscription.unsubscribe();
            this.updatedSubscription = null;
        }
        if (this.deletedSubscription != null){
            this.deletedSubscription.unsubscribe();
            this.deletedSubscription = null;
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
                    this.coreServices.notification.showErrorToast(
                        'Unabled to load summaries: ' + err.message
                    );
                }
            );
    }

    protected doCreate(asset: T){
        let name = asset.name;
        this.startProgress();
        this.assetService.create(asset, this.parentId)
            .finally<ApiResponse<any>>(()=>{
                this.endProgress();
            })
            .subscribe(
                response => {
                    this.isCreationFormActive = false;
                    this.coreServices.notification.showSuccessToast('Created: ' + name);
                    // this.refresh(); // createdSubscription will do it
                },
                err => {
                    this.coreServices.notification.showErrorToast(
                                'Unabled to create: ' + err.message
                            );
                }
            );
        
    }


    navigateToThis(){
        if (this.router && this.routeSegment){
            this.router.navigate(['./'], this.routeSegment);
        }
    }

    isEditing(i: number): boolean{
        return i === this.indexInEdit;
    }

    toggleEditing(i: number){
        this.indexInEdit = this.isEditing(i) ? undefined : i;
        if (this.indexInEdit != null){
            this.isCreationFormActive = false;
        }
    }

    quitEditing(i?: number){
        if (i == null || i === this.indexInEdit){
            this.indexInEdit = null;
        }
    }


}