import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dam-note',
    template: require('./note.component.html')
})

export class NoteComponent implements OnInit {

    sessionList: any;
    eleveList: any;
    constructor() {
        this.sessionList = [];
        this.eleveList = [];
    }

    ngOnInit() { }

    showeleve(eleve) {
        console.log(eleve);
    }

    showsession(session) {
        console.log(session);
    }
}
