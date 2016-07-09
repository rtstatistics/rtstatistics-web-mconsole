import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdIcon} from '@angular2-material/icon';
import {InterchangeableFieldsComponent} from './interchangeable-fields.component';

@Component({
    moduleId: module.id,
    selector: 'key-fields',
    template: require('./key-fields.component.html'),
    directives: [
        MD_INPUT_DIRECTIVES, MdIcon,
        InterchangeableFieldsComponent
    ],
})
export class KeyFieldsComponent {
    @Input()
    fields: (string|string[]) [];

    @Output()
    change: EventEmitter<(string|string[]) []> = new EventEmitter<(string|string[]) []>();

    constructor() { }

    addEmpty(){
        /* avoid creating new object
        if (this.fields == null){
            this.fields = [];
        }*/
        this.fields.push('');
    }

    update(index: number, input: string|string[]){
        if (input == null || Array.isArray(input)){
            this.fields[index] = input;
        } else { // typeof input === 'string'
            let splitted: string[] = input.split(/[, ]+/).filter(x=>x !== '');
            switch(splitted.length){
                case 0:
                    this.fields[index] = null;
                    break;
                case 1:
                    this.fields[index] = splitted[0];
                    break;
                default:
                    this.fields[index] = splitted;
            }
        }
    }

    delete(index: number){
        this.fields.splice(index, 1);
    }
}