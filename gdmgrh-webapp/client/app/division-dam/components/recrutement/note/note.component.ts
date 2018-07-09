import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dam-note',
    template: require('./note.component.html')
})

export class NoteComponent implements OnInit {

    sessionList: any;
    eleveList: any;
    sessionPanel: string;
    show: boolean;

    constructor() {
        this.sessionList = [];
        this.eleveList = [];
        this.show = false;
        this.sessionPanel = 'col-12';
    }

    ngOnInit() {
        this.getSession();
    }

    getSession() {
        this.sessionList = [{numero: 'se1212', libelle: 'Session-10', effectif: 50, annee: 2015}];
    }

    showeleve(eleve) {
        console.log(eleve);
    }

    showsession(session) {
        this.sessionPanel = 'col-md-6 col-sm-12 col-12'
        this.show = true;
        console.log(session);
    }
}
