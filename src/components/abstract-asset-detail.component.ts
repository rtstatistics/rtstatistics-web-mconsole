import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from "../models/api-response";

export abstract class AbstractAssetDetailComponent<T>{
    protected abstract doGetDetail():Observable<ApiResponse<T>>;
    protected abstract doDelete():Observable<ApiResponse<any>>;

    id: string;
    detail: T;
    isInProgress: boolean = false;


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
                        console.log(err);
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