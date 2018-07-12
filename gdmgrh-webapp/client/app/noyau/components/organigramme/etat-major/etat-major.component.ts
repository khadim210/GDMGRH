import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';

@Component({
    selector: 'selector-etat-major',
    template: require('./etat-major.component.html')
})

export class EtatMajorComponent implements OnInit {

    cmdtEtatMajor: any;

    constructor(
        private organigrammeService: OrganigrammeService
    ) {
        this.cmdtEtatMajor = {};
        this.cmdtEtatMajor.division = [];
    }

    ngOnInit() {
        this.getEtatMajor();
    }

    getEtatMajor() {
        this.organigrammeService.getEtatMajor().subscribe(res => {
            if (res) {
                if (res.alletatmajor[0]) {
                    this.cmdtEtatMajor = res.alletatmajor[0];
                }
            }
        });
    }
}
