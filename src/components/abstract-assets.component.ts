import { Component, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from '../models/api-response';
import { Asset } from '../models/asset';
import { NotificationService } from '../services/notification.service';
import { AbstractAssetService } from '../services/abstract-asset.service';
import { AbstractComponent } from './abstract.component';
import { ProgressTracker } from '../utils/progress-tracker';

export class AbstractAssetsComponent<T extends Asset> extends AbstractComponent implements OnActivate, AfterViewInit{
    routeSegment: RouteSegment;

    @Input()
    parentId: string;  // this may be null if there is no parent

    @Input()
    set progressTracker(tracker: ProgressTracker){
        this._progressTracker = tracker;
    }

    get progressTracker(): ProgressTracker{
        return this._progressTracker;
    }

    private indexInEdit: number;
    quitEditingCallback: (i: number)=>void = this.quitEditing.bind(this);

    assets: T[];
    isDetailVisible: boolean = false;

    _isCreationFormActive: boolean = false;
    get isCreationFormActive(){
        return this._isCreationFormActive;
    }
    set isCreationFormActive(b: boolean){
        this._isCreationFormActive = b;
        if (b){
            this.toggleEditing(undefined);
        }
    }

    protected createdSubscription:any;
    protected updatedSubscription:any;
    protected deletedSubscription:any;


    constructor(
        protected router: Router, 
        protected notificationService: NotificationService,
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
                    this.notificationService.showErrorToast(
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
                    this.notificationService.showSuccessToast('Created: ' + name);
                    // this.refresh(); // createdSubscription will do it
                },
                err => {
                    this.notificationService.showErrorToast(
                                'Unabled to create: ' + err.message
                            );
                }
            );
        
    }


    navigateToThis(){
        if (this.router && this.routeSegment){
            this.router.navigate(['./'], this.routeSegment);
        }
        this.isDetailVisible = false;
    }

    isEditing(i: number): boolean{
        return i === this.indexInEdit;
    }

    toggleEditing(i: number){
        this.indexInEdit = this.isEditing(i) ? undefined : i;
        if (this.isEditing(i)){
            this.isCreationFormActive = false;
        }
    }

    quitEditing(i: number){
        if (this.isEditing(i)){
            this.toggleEditing(i);
        }
    }


}