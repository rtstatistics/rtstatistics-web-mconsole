import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from '../models/api-response';
import { Asset } from '../models/asset';
import { NotificationService } from '../services/notification.service';
import { AbstractAssetService } from '../services/abstract-asset.service';
import { ProgressTracker } from '../utils/progress-tracker';

/**
 * Parent of components that have a progress tracker.
 * 
 * @export
 * @class AbstractProgressiveComponent
 */
export class AbstractProgressiveComponent{
    /**
     * The progress tracker that this component should use.
     * If it is not injected/overriden externally, a default one associated
     * with the instance will be used.
     * 
     * @type {ProgressTracker}
     */
    progressTracker: ProgressTracker = new ProgressTracker();


    get isInProgress(): boolean{
        return this.progressTracker.isInProgress;
    }

    startProgress(){
        setTimeout(()=>{    // to ensure change detection
            this.progressTracker.startProgress();
        }, 0);
    }

    endProgress(){
        setTimeout(()=>{    // to ensure change detection
            this.progressTracker.endProgress();
        }, 0);
    }
}