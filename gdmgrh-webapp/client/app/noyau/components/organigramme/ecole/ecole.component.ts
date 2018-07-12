import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';

@Component({
    selector: 'selector-ecole',
    template: require('./ecole.component.html')
})

export class EcoleComponent implements OnInit {

    cmdtEcole: any;

    constructor(
        private organigrammeService: OrganigrammeService
    ) {
        this.cmdtEcole = {};
        this.cmdtEcole.subdivision = [];
    }

    ngOnInit() {
        this.getEcoleCommandt();
    }

    getEcoleCommandt() {
        this.organigrammeService.getOneSousCommandt({type: 'ecole'}).subscribe(res => {
            if (res) {
                if (res.souscommandt) {
                    this.cmdtEcole = res.souscommandt;
                }
            }
        });
    }
}
