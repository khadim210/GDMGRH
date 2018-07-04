import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'general-dashboad',
    template: require('./general-dashboad.component.html')
})

export class GeneralDashboadComponent implements OnInit {

    role: string;

    constructor() { }

    ngOnInit() {}
}
