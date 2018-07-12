import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';

@Component({
    selector: 'selector-mobile',
    template: require('./mobile.component.html')
})

export class MobileComponent implements OnInit {

    cmdtMobile: any;

    constructor(
        private organigrammeService: OrganigrammeService
    ) {
        this.cmdtMobile = {};
        this.cmdtMobile.legion = [];
        this.cmdtMobile.unite = [];
    }

    ngOnInit() {
        this.getMobile();
    }

    getMobile() {
        this.organigrammeService.getMobile().subscribe(res => {
            if (res) {
                if (res.allMobile[0]) {
                    this.cmdtMobile = res.allMobile[0];
                }
            }
        });
    }
}
