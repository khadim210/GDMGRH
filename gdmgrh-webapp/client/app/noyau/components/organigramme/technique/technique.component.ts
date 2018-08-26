import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';
import { NotificationService } from '../../../../website/service/notification.service';

@Component({
    selector: 'selector-technique',
    template: require('./technique.component.html')
})

export class TechniqueComponent implements OnInit {

    cmdtTechnique: any;
    btnAction: string;
    selectItem: string;
    modelTechnique: any;
    msgerror: any;

    constructor(
        private organigrammeService: OrganigrammeService,
        private notificationService: NotificationService,
    ) {
        this.cmdtTechnique = {};
        this.modelTechnique = {};
        this.cmdtTechnique.subdivision = [];
        this.btnAction = 'Modifier';
        this.selectItem = '';
        this.msgerror = '';
    }

    ngOnInit() {
        this.getTechniqueCommandt();
    }

    getTechniqueCommandt() {
        this.organigrammeService.getOneSousCommandt('technique').subscribe(res => {
            if (res) {
                if (res.souscommandt) {
                    this.cmdtTechnique = res.souscommandt;
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
        this.modelTechnique = {};
        this.selectItem = '';
    }

    handlerAdd(element) {
        this.cmdtTechnique.subdivision.push(element);
        this.updateCmdt(this.cmdtTechnique);
    }

    handlerUpdate(name, element) {
        if (name === 'cmdt') {
            this.updateCmdt(element);
        } else {
            this.updateSubdivision(element);
        }
    }
    
    updateSubdivision(subdivision) {
        for (let keySub = 0; keySub < this.cmdtTechnique.subdivision.length; keySub++) {
            if (this.cmdtTechnique.subdivision[keySub]._id === subdivision._id) {
                this.cmdtTechnique.subdivision[keySub] = subdivision;
            }
        }
        this.updateCmdt(this.cmdtTechnique);
    }

    deleteSubdivision(idSubdivision) {
        this.cmdtTechnique.subdivision = this.cmdtTechnique.subdivision
            .filter(_subdivision => _subdivision._id !== idSubdivision);
            this.updateCmdt(this.cmdtTechnique);
    }

    updateCmdt(cmdt) {
        this.organigrammeService.updateSousCommandt(cmdt).subscribe(res => {
            if (res.souscommandt) {
                this.cmdtTechnique = res.souscommandt;
                this.modelTechnique = {};
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
