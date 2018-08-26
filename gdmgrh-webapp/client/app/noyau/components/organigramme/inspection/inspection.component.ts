import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';
import { NotificationService } from '../../../../website/service/notification.service';

@Component({
    selector: 'selector-inspection',
    template: require('./inspection.component.html')
})

export class InspectionComponent implements OnInit {

    cmdtInspection: any;
    btnAction: string;
    selectItem: string;
    modelInspection: any;
    msgerror: string;

    constructor(
        private organigrammeService: OrganigrammeService,
        private notificationService: NotificationService,
    ) {
        this.cmdtInspection = {};
        this.modelInspection = {};
        this.cmdtInspection.subdivision = [];
        this.btnAction = 'Modifier';
        this.selectItem = '';
        this.msgerror = '';
    }

    ngOnInit() {
        this.getInspectionCommandt();
    }

    getInspectionCommandt() {
        this.organigrammeService.getOneSousCommandt('inspection').subscribe(res => {
            if (res) {
                if (res.souscommandt) {
                    this.cmdtInspection = res.souscommandt;
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
        this.modelInspection = {};
        this.selectItem = '';
    }

    handlerAdd(element) {
        this.cmdtInspection.subdivision.push(element);
        this.updateCmdt(this.cmdtInspection);
    }

    handlerUpdate(name, element) {
        if (name === 'cmdt') {
            this.updateCmdt(element);
        } else {
            this.updateSubdivision(element);
        }
    }

    updateSubdivision(subdivision) {
        for (let keySub = 0; keySub < this.cmdtInspection.subdivision.length; keySub++) {
            if (this.cmdtInspection.subdivision[keySub]._id === subdivision._id) {
                this.cmdtInspection.subdivision[keySub] = subdivision;
            }
        }
        this.updateCmdt(this.cmdtInspection);
    }

    deleteSubdivision(idSubdivision) {
        this.cmdtInspection.subdivision = this.cmdtInspection.subdivision
            .filter(_subdivision => _subdivision._id !== idSubdivision);
        this.updateCmdt(this.cmdtInspection);
    }

    updateCmdt(cmdt) {
        this.organigrammeService.updateSousCommandt(cmdt).subscribe(res => {
            if (res.souscommandt) {
                this.cmdtInspection = res.souscommandt;
                this.modelInspection = {};
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
