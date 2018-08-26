import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';
import { NotificationService } from '../../../../website/service/notification.service';

@Component({
    selector: 'selector-ecole',
    template: require('./ecole.component.html')
})

export class EcoleComponent implements OnInit {

    cmdtEcole: any;
    btnAction: string;
    selectItem: string;
    modelEcole: any;
    msgerror: string;

    constructor(
        private organigrammeService: OrganigrammeService,
        private notificationService: NotificationService,
    ) {
        this.cmdtEcole = {};
        this.modelEcole = {};
        this.cmdtEcole.subdivision = [];
        this.btnAction = 'Modifier';
        this.selectItem = '';
        this.msgerror = '';
    }

    ngOnInit() {
        this.getEcoleCommandt();
    }

    getEcoleCommandt() {
        this.organigrammeService.getOneSousCommandt('ecole').subscribe(res => {
            if (res) {
                if (res.souscommandt) {
                    this.cmdtEcole = res.souscommandt;
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
        this.modelEcole = {};
        this.selectItem = '';
    }

    handlerAdd(element) {
        this.cmdtEcole.subdivision.push(element);
        this.updateCmdt(this.cmdtEcole);
    }

    handlerUpdate(name, element) {
        if (name === 'cmdt') {
            this.updateCmdt(element);
        } else {
            this.updateSubdivision(element);
        }
    }

    updateSubdivision(subdivision) {
        for (let keySub = 0; keySub < this.cmdtEcole.subdivision.length; keySub++) {
            if (this.cmdtEcole.subdivision[keySub]._id === subdivision._id) {
                this.cmdtEcole.subdivision[keySub] = subdivision;
            }
        }
        this.updateCmdt(this.cmdtEcole);
    }

    deleteSubdivision(idSubdivision) {
        this.cmdtEcole.subdivision = this.cmdtEcole.subdivision
            .filter(_subdivision => _subdivision._id !== idSubdivision);
        this.updateCmdt(this.cmdtEcole);
    }

    updateCmdt(cmdt) {
        this.organigrammeService.updateSousCommandt(cmdt).subscribe(res => {
            if (res.souscommandt) {
                this.cmdtEcole = res.souscommandt;
                this.modelEcole = {};
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
