import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dam-session',
    template: require('./session.component.html')
})

export class SessionComponent implements OnInit {

    sessionList: any;
    sessionForm: any;

    constructor() {
        this.sessionForm = {};
        this.sessionList = [];
    }

    ngOnInit() { }
}
