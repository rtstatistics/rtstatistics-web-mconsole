import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

@Component({
    moduleId: module.id,
    selector: 'interchangeable-fields',
    templateUrl: 'interchangeable-fields.component.html',
    directives: [
        MD_INPUT_DIRECTIVES
    ]
})
export class InterchangeableFieldsComponent{
    @Input()
    fields: string|string[];

    @Output()
    change = new EventEmitter<string|string[]>();

    get fieldsAsString(): string{
        if (this.fields == null || typeof this.fields === 'string'){
            return <string>this.fields;
        }else{
            switch(this.fields.length){
                case 0:
                    return null;
                case 1:
                    return this.fields[0];
                default:
                    return (<string[]>(this.fields)).join(', ');
            }
        }
    }

    set fieldsAsString(input: string){
        let previousString = this.fieldsAsString;
        if (input == null){
            this.fields = input;
        } else {
            let splitted: string[] = input.split(/[, ]+/).filter(x=>x !== '');
            switch(splitted.length){
                case 0:
                    this.fields = null;
                    break;
                case 1:
                    this.fields = splitted[0];
                    break;
                default:
                    this.fields = splitted;
            }
        }
        if (previousString != this.fieldsAsString){ // in case of just adding spaces or comma
            this.change.emit(this.fields);
        }
    }
    
    constructor() { }

}