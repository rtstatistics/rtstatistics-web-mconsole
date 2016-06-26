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
    // Angular cannot find the @Input in grand parent class.
    // And, Typescript compiler requires getter and setter methods n the same class
    protected _progressTracker: ProgressTracker = new ProgressTracker();


    get isInProgress(): boolean{
        return this._progressTracker.isInProgress;
    }

    startProgress(){
        setTimeout(()=>{    // to ensure change detection
            this._progressTracker.startProgress();
        }, 0);
    }

    endProgress(){
        setTimeout(()=>{    // to ensure change detection
            this._progressTracker.endProgress();
        }, 0);
    }
}