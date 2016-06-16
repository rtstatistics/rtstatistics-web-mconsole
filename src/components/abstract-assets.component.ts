import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from "../models/api-response";
import { NotificationService } from '../services/notification.service';

export abstract class AbstractAssetsComponent<T>{
    protected abstract doGetAll():Observable<ApiResponse<T[]>>;

    routeSegment: RouteSegment;
    assets: T[];
    isInProgress: boolean = false;

    constructor(protected router: Router, protected notificationService: NotificationService){
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
                        this.notificationService.showErrorToast(
                            'Unabled to load or refresh: ' + err.message
                        );
                        this.isInProgress = false;
                    }
            );
         }
    }

    navigateBack(){
        this.router.navigate(['./'], this.routeSegment);
    }


}