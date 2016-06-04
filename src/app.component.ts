import { Component } from '@angular/core';

@Component({
    selector: 'mconsole-app',
    template: `
        <h1>Management Console: {{title}}</h1>
        <span>Clicks: {{count}}<span>
        <button (click)="increaseCount()">Click me</button>
    `
})
export class AppComponent { 
    count = 0;
    title = "Hello World!";
    
    increaseCount(){
        this.count ++;
    }
}