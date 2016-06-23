import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from '../models/api-response';
import { Asset } from '../models/asset';
import { NotificationService } from '../services/notification.service';
import { AbstractAssetService } from '../services/abstract-asset.service';
import { ProgressTracker } from '../utils/progress-tracker';

export class AbstractComponent{
    private progressTracker: ProgressTracker = new ProgressTracker();

    /**
     * Change a child component's progress tracker to
     * the same as this component.
     */
    shareProgressTracker(child: AbstractComponent){
        child.progressTracker = this.progressTracker;
    }

    get isInProgress(): boolean{
        return this.progressTracker.isInProgress;
    }

    startProgress(){
        this.progressTracker.startProgress();
    }

    endProgress(){
        this.progressTracker.endProgress();
    }
}