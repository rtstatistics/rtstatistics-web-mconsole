import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from "../models/api-response";
import { NotificationService } from '../services/notification.service';

export abstract class AbstractAssetDetailComponent<T>{
    protected abstract doGetDetail():Observable<ApiResponse<T>>;
    protected abstract doDelete():Observable<ApiResponse<any>>;

    id: string;
    detail: T;
    isInProgress: boolean = false;

    constructor(protected notificationService: NotificationService){

    }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) : void {
        this.id = curr.getParam('id');
        this.refresh();
    }

    refresh(){
        if (!this.isInProgress){
            this.isInProgress = true;
            this.doGetDetail()
                .subscribe(
                    data => {
                        this.detail = data.result;
                        this.isInProgress = false;
                    },
                    err => {
                        this.notificationService.showErrorToast(
                            'Unabled to load or refresh: ' + err.message
                        );
                        this.isInProgress = false;
                    }
            );
         }
    }

    delete(){
        if (!this.isInProgress){
            this.isInProgress = true;
            this.doDelete()
                .subscribe(
                    data => {
                        //this.detail = data.result;
                        this.isInProgress = false;
                    },
                    err => {
                        console.log(err);
                        this.isInProgress = false;
                    }
            );
         }
    }


}