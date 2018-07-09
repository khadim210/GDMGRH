import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dam-gendarme-auxiliaire',
    template: require('./gendarme-auxiliaire.component.html')
})

export class GendarmeAuxiliaireComponent implements OnInit {

    gendarmeauxiliaireList: any;
    gendarmeauxiliaireForm: any;

    constructor() { 
        this.gendarmeauxiliaireList = [];
        this.gendarmeauxiliaireForm = {};
    }

    ngOnInit() { }
}
