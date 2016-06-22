import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouteSegment, OnActivate, RouteTree } from '@angular/router';
import { ApiResponse } from '../models/api-response';
import { Asset } from '../models/asset';
import { NotificationService } from '../services/notification.service';
import { AbstractAssetService } from '../services/abstract-asset.service';

export class AbstractComponent{
    protected inProgressCount: number = 0;
    get isInProgress(){
        return this.inProgressCount > 0;
    }

    protected startProgress(){
        this.inProgressCount ++;
    }

    protected endProgress(){
        this.inProgressCount --;
    }
}