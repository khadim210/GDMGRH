import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';

@Component({
    selector: 'selector-sante',
    template: require('./sante.component.html')
})

export class SanteComponent implements OnInit {

    cmdtSante: any;

    constructor(
        private organigrammeService: OrganigrammeService
    ) {
        this.cmdtSante = {};
        this.cmdtSante.subdivision = [];
    }

    ngOnInit() {
        this.getSanteCommandt();
    }

    getSanteCommandt() {
        this.organigrammeService.getOneSousCommandt({type: 'sante'}).subscribe(res => {
            if (res) {
                if (res.souscommandt) {
                    this.cmdtSante = res.souscommandt;
                }
            }
        });
    }
}
