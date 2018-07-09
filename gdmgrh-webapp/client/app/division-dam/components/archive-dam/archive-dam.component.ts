import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dam-archive-dam',
    template: require('./archive-dam.component.html')
})

export class ArchiveDamComponent implements OnInit {

    archiveList: any;
    constructor() {
        this.archiveList = []
    }

    ngOnInit() { }
}