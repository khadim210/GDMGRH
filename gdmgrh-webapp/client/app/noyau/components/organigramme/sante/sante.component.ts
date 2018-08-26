import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';
import { NotificationService } from '../../../../website/service/notification.service';

@Component({
    selector: 'selector-sante',
    template: require('./sante.component.html')
})

export class SanteComponent implements OnInit {

    cmdtSante: any;
    btnAction: string;
    selectItem: string;
    modelSante: any;
    msgerror: string;

    constructor(
        private organigrammeService: OrganigrammeService,
        private notificationService: NotificationService,
    ) {
        this.cmdtSante = {};
        this.modelSante = {};
        this.cmdtSante.subdivision = [];
        this.btnAction = 'Modifier';
        this.selectItem = '';
        this.msgerror = '';
    }

    ngOnInit() {
        this.getSanteCommandt();
    }

    getSanteCommandt() {
        this.organigrammeService.getOneSousCommandt('sante').subscribe(res => {
            if (res) {
                if (res.souscommandt) {
                    this.cmdtSante = res.souscommandt;
                }
            }
        });
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
            this.selectItem = '';
        }
    }

    addSubdivision() {
        this.modelSante = {};
        this.selectItem = '';
    }

    handlerAdd(element) {
        this.cmdtSante.subdivision.push(element);
        this.updateCmdt(this.cmdtSante);
    }

    handlerUpdate(name, element) {
        if (name === 'cmdt') {
            this.updateCmdt(element);
        } else {
            this.updateSubdivision(element);
        }
    }

    updateSubdivision(subdivision) {
        for (let keySub = 0; keySub < this.cmdtSante.subdivision.length; keySub++) {
            if (this.cmdtSante.subdivision[keySub]._id === subdivision._id) {
                this.cmdtSante.subdivision[keySub] = subdivision;
            }
        }
        this.updateCmdt(this.cmdtSante);
    }

    deleteSubdivision(idSubdivision) {
        this.cmdtSante.subdivision = this.cmdtSante.subdivision
            .filter(_subdivision => _subdivision._id !== idSubdivision);
            this.updateCmdt(this.cmdtSante);
    }

    updateCmdt(cmdt) {
        this.organigrammeService.updateSousCommandt(cmdt).subscribe(res => {
            if (res.souscommandt) {
                this.cmdtSante = res.souscommandt;
                this.modelSante = {};
                this.selectItem = '';
                this.notificationService.showSuccess('Mise à Jour', 'Enregistrement avec succès');
            } else if (422 === res.status) {
                this.msgerror = res.error.message;
                this.notificationService.showError('Mise à Jour', this.msgerror);
            } else if (500 === res.status) {
                this.msgerror = res.error.message;
                this.notificationService.showError('Mise à Jour', this.msgerror);
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
