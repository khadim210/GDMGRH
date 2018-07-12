import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';

@Component({
    selector: 'selector-technique',
    template: require('./technique.component.html')
})

export class TechniqueComponent implements OnInit {

    cmdtTechnique: any;

    constructor(
        private organigrammeService: OrganigrammeService
    ) {
        this.cmdtTechnique = {};
        this.cmdtTechnique.subdivision = [];
    }

    ngOnInit() {
        this.getTechniqueCommandt();
    }

    getTechniqueCommandt() {
        this.organigrammeService.getOneSousCommandt({type: 'technique'}).subscribe(res => {
            if (res) {
                if (res.souscommandt) {
                    this.cmdtTechnique = res.souscommandt;
                }
            }
        });
    }
}
