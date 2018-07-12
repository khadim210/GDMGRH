import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';

@Component({
    selector: 'selector-territorial',
    template: require('./territorial.component.html')
})

export class TerritorialComponent implements OnInit {

    cmdtTerritorial: any;

    constructor(
        private organigrammeService: OrganigrammeService
    ) {
        this.cmdtTerritorial = {};
        this.cmdtTerritorial.legion = [];
        this.cmdtTerritorial.section = [];
    }

    ngOnInit() {
        this.getTerritorial();
    }

    getTerritorial() {
        this.organigrammeService.getTerritorial().subscribe(res => {
            if (res) {
                if (res.allTerritorial[0]) {
                    this.cmdtTerritorial = res.allTerritorial[0];
                }
            }
        });
    }
}
