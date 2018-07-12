import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';

@Component({
    selector: 'selector-inspection',
    template: require('./inspection.component.html')
})

export class InspectionComponent implements OnInit {

    cmdtInspection: any;

    constructor(
        private organigrammeService: OrganigrammeService
    ) {
        this.cmdtInspection = {};
        this.cmdtInspection.subdivision = [];
    }

    ngOnInit() {
        this.getInspectionCommandt();
    }

    getInspectionCommandt() {
        this.organigrammeService.getOneSousCommandt({type: 'inspection'}).subscribe(res => {
            if (res) {
                if (res.souscommandt) {
                    this.cmdtInspection = res.souscommandt;
                }
            }
        });
    }
}
