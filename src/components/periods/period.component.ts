import { Component, OnInit, Input } from '@angular/core';

import {MdIcon} from '@angular2-material/icon';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

import { DoCheck, KeyValueDiffers, IterableDiffers } from '@angular/core';

import {Period} from '../../models/periods-hierarchy';

@Component({
    moduleId: module.id,
    selector: 'period',
    template: require('./period.component.html'),
    styles: [require('./period.component.css')],
    directives: [
        MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_INPUT_DIRECTIVES,
        MD_LIST_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MdIcon,
        PeriodComponent
    ],

})
export class PeriodComponent implements OnInit{//, DoCheck{
    @Input()
    isRoot: boolean = false;

    _period: Period;
    @Input()
    set period(p: Period){
        this._period = p;
    }
    get period(){
        if (this._period == null){
            this._period = new Period();
        }
        return this._period;
    }

    objDiffer: any;
    arrDiffer: any;

    constructor(private kvDiffers: KeyValueDiffers, private itrDiffers: IterableDiffers) { 
    }

    ngOnInit() { 
        this.objDiffer = this.kvDiffers.find({}).create(null);
        this.arrDiffer = this.itrDiffers.find([]).create(null);
    }

/*
    ngDoCheck() {
        let allChanges = [];
		let changes = this.objDiffer.diff(this.period);
        if (changes != null){
            allChanges.push(changes);
        }else if (this.period.upperLevelPeriods != null){
            changes = this.arrDiffer.diff(this.period.upperLevelPeriods);
            if (changes != null){
                allChanges.push(changes);
            }
        }

        for (let changes of allChanges){
            if(changes) {
                console.log('changes detected');
                //changes.forEachChangedItem(r => console.log('changed ', r.currentValue));
                changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
                changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
            } else {
                console.log('nothing changed');
            }
        }
	}
*/
    addEmptyUpperLevel(){
        if (this.period.upperLevelPeriods == null){
            this.period.upperLevelPeriods = [];
        }

        this.period.upperLevelPeriods.push(new Period());
    }

    deleteUpperLevel(i: number){
        this.period.upperLevelPeriods.splice(i, 1);
    }
}