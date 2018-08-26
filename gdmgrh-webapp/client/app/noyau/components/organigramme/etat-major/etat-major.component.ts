import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';

@Component({
    selector: 'selector-etat-major',
    template: require('./etat-major.component.html')
})

export class EtatMajorComponent implements OnInit {

    cmdtEtatMajor: any;
    btnAction: string;
    selectItem: string;
    showPDivision: string;
    indexDivision: string;

    constructor(
        private organigrammeService: OrganigrammeService
    ) {
        this.cmdtEtatMajor = {};
        this.cmdtEtatMajor.division = [];
        this.btnAction = 'Modifier';
        this.selectItem = '';
        this.showPDivision = '+';
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
                console.log(this.cmdtEtatMajor);
            }
        });
    }

    onElementEmit(emited) {
        if (this.selectItem === '') {
            if (emited.action === 'supprimer') {
                this.deleteDivision(emited.element._id.toString());
            } else {
                this.selectItem = emited.element._id.toString();
                this.btnAction = 'Enregistrer';
            }
        } else {
            if (emited.action === 'modifier') {
                this.handlerUpdate(emited.name, emited.element);
            }
            this.btnAction = 'Modifier';
            this.selectItem = '';
        }
    }

    handlerUpdate(name, element) {
        if (name === 'cmdt') {
            this.updateCmdt(element);
        } else {
            this.updateDivision(element);
        }
    }
    updateDivision(division) {
        console.log(division);
    }

    updateCmdt(cmdt) {
        console.log(cmdt);
    }

    deleteDivision(iddivision) {
        for (let index = 0; index < this.cmdtEtatMajor.division.length; index++) {
            this.cmdtEtatMajor.division[index].iddivision =
                    this.cmdtEtatMajor.division[index].iddivision
                        .filter(_division => _division._id !== iddivision);
        }
    }

    showPanel(name, index = null) {
        if (name === 'division') {
            this.indexDivision = index;
            this.showPDivision === '+' ? this.showPDivision = '-' : this.showPDivision = '+';
        }
    }
}
