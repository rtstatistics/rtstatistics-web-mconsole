import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from "../models/api-response";

export abstract class AbstractAssetsComponent<T>{
    protected abstract doGetAll():Observable<ApiResponse<T[]>>;

    routeSegment: RouteSegment;
    assets: T[];
    isInProgress: boolean = false;

    constructor(protected router: Router){
    }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) : void {
        this.routeSegment = curr;
        this.refresh();
    }

    refresh(){
        if (!this.isInProgress){
            this.isInProgress = true;
            this.doGetAll()
                .subscribe(
                    data => {
                        this.assets = data.result;
                        this.isInProgress = false;
                    },
                    err => {
                        console.log(err);
                        this.isInProgress = false;
                    }
            );
         }
    }

    navigateBack(){
        this.router.navigate(['./'], this.routeSegment);
    }


}