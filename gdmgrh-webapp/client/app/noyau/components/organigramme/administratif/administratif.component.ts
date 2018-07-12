import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';

@Component({
    selector: 'selector-administratif',
    template: require('./administratif.component.html')
})

export class AdministratifComponent implements OnInit {

    cmdtAdministratif: any;

    constructor(
        private organigrammeService: OrganigrammeService
    ) {
        this.cmdtAdministratif = {};
        this.cmdtAdministratif.subdivision = [];
    }

    ngOnInit() {
        this.getAdministratifCommandt();
    }
    getAdministratifCommandt() {
        this.organigrammeService.getOneSousCommandt({type: 'administratif'}).subscribe(res => {
            if (res) {
                if (res.souscommandt) {
                    this.cmdtAdministratif = res.souscommandt;
                }
            }
        });
    }
}
