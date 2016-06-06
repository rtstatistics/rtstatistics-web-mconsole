import { Component } from '@angular/core';
import {Router,Routes,ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'mconsole-app',
    template: require('./home.component.html'),
    styles: [require('./home.component.css')]
})
export class HomeComponent { 
    count = 0;
    title = "Hello World!";
    
    increaseCount(){
        this.count ++;
    }
}