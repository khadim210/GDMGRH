import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dam-candidature',
    template: require('./candidature.component.html')
})

export class CandidatureComponent implements OnInit {

    candidatList: any;
    sessionList: any;
    candidatFrom: any;

    constructor() {
        this.sessionList = [];
        this.candidatList = [];
        this.candidatFrom = {};
    }

    ngOnInit() { }

    showcandidat(candidat) {
        console.log(candidat);
    }
}
