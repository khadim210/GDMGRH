import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dam-mutation',
    template: require('./mutation-dam.component.html')
})

export class MutationDamComponent implements OnInit {

    mutationList: any;
    mutationFrom: any;

    constructor() {
        this.mutationFrom = {};
        this.mutationList = [];
    }

    ngOnInit() {}

    getMutation() {
        this.mutationList = [];
    }
}
