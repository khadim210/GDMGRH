import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';
import { NotificationService } from '../../../../website/service/notification.service';

@Component({
    selector: 'selector-administratif',
    template: require('./administratif.component.html')
})

export class AdministratifComponent implements OnInit {

    cmdtAdministratif: any;
    modelAdministratif: any;
    btnAction: string;
    selectItem: string;
    msgerror: string;

    constructor(
        private organigrammeService: OrganigrammeService,
        private notificationService: NotificationService,
    ) {
        this.cmdtAdministratif = {};
        this.modelAdministratif = {};
        this.cmdtAdministratif.subdivision = [];
        this.btnAction = 'Modifier';
        this.selectItem = '';
        this.msgerror = '';
    }

    ngOnInit() {
        this.getAdministratifCommandt();
    }
    getAdministratifCommandt() {
        this.organigrammeService.getOneSousCommandt('administratif').subscribe(res => {
            if (res) {
                if (res.souscommandt) {
                    this.cmdtAdministratif = res.souscommandt;
                }
            }
        });
    }

    addSubdivision() {
        this.modelAdministratif = {};
        this.selectItem = '';
    }

    onElementEmit(emited) {
        if (this.selectItem === '') {
            if (emited.action === 'supprimer') {
                this.deleteSubdivision(emited.element._id.toString());
            } else if (emited.action === 'ajouter') {
                this.handlerAdd(emited.element);
            } else {
                this.selectItem = emited.element._id.toString();
                this.btnAction = 'Enregistrer';
            }
        } else {
            if (emited.action === 'modifier') {
                this.handlerUpdate(emited.name, emited.element);
            }
            this.btnAction = 'Modifier';
            this.modelAdministratif = {};
            this.selectItem = '';
        }
    }

    handlerAdd(element) {
        this.cmdtAdministratif.subdivision.push(element);
        this.updateCmdt(this.cmdtAdministratif);
    }

    handlerUpdate(name, element) {
        if (name === 'cmdt') {
            this.updateCmdt(element);
        } else {
            this.updateSubdivision(element);
        }
    }
    updateSubdivision(subdivision) {
        for (let keySub = 0; keySub < this.cmdtAdministratif.subdivision.length; keySub++) {
            if (this.cmdtAdministratif.subdivision[keySub]._id === subdivision._id) {
                this.cmdtAdministratif.subdivision[keySub] = subdivision;
            }
        }
        this.updateCmdt(this.cmdtAdministratif);
    }

    deleteSubdivision(idSubdivision) {
        this.cmdtAdministratif.subdivision = this.cmdtAdministratif.subdivision
            .filter(_subdivision => _subdivision._id !== idSubdivision);
        this.updateCmdt(this.cmdtAdministratif);
    }

    updateCmdt(cmdt) {
        this.organigrammeService.updateSousCommandt(cmdt).subscribe(res => {
            if (res.souscommandt) {
                this.cmdtAdministratif = res.souscommandt;
                this.modelAdministratif = {};
                this.selectItem = '';
            } else if (422 === res.status) {
                this.msgerror = res.error.message;
            } else if (500 === res.status) {
                this.msgerror = res.error.message;
            }
        });
    }

    /*
    updateCmdt(cmdt) {
        if (this.selectItem !== '') {
            this.selectItem = '';
            this.btnAction = 'Modifier';
        } else {
            this.selectItem = cmdt._id.toString();
            this.btnAction = 'Enregistrer';
            console.log(cmdt);
            console.log(this.selectItem);
            console.log(this.btnAction);
        }
    }
    */
}
