import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dam-admis',
    template: require('./admis.component.html')
})

export class AdmisComponent implements OnInit {

    admisList: any;
    admisForm: any;

    constructor() {
        this.admisList = [];
        this.admisForm = {};
    }

    ngOnInit() { }

    showadmis(admis) {
        console.log(admis);
    }
}
