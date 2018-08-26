import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';
import { NotificationService } from '../../../../website/service/notification.service';

@Component({
    selector: 'selector-territorial',
    template: require('./territorial.component.html')
})

export class TerritorialComponent implements OnInit {

    cmdtTerritorial: any;
    inputClassCmdt: string;
    readonlyCmdt: boolean;
    btnAction: string;
    selectItem: string;
    btnSousAction: string;
    showOneLegion: string;
    indexLegion: string;
    showPCompagnie: string;
    showPBrigade: string;
    showPSections: string;
    showPBrigadeCompagnie: string;

    constructor(
        private organigrammeService: OrganigrammeService,
        private notificationService: NotificationService,
    ) {
        this.cmdtTerritorial = {};
        this.cmdtTerritorial.legion = [];
        this.cmdtTerritorial.section = [];
        this.inputClassCmdt = 'form-control-plaintext';
        this.readonlyCmdt = true;
        this.btnAction = 'Modifier';
        this.selectItem = '';
        this.btnSousAction = '';
        this.showOneLegion = '+';
        this.showPCompagnie = '+';
        this.showPBrigade = '+';
        this.showPSections = '+';
        this.showPBrigadeCompagnie = '+';
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
            console.log(this.cmdtTerritorial);
        });
    }

    onElementEmit(emited) {
        if (this.selectItem === '') {
            if (emited.action === 'supprimer') {
                this.handlerDelete(emited.name, emited.element._id.toString());
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
        switch (name) {
            case 'cmdt': {
                console.log(element);
                break;
            }
            case 'section': {
                console.log(element);
                break;
            }
            case 'brigade': {
                console.log(element);
                break;
            }
            case 'compagnie': {
                console.log(element);
                break;
            }
            case 'brigade compagnie': {
                console.log(element);
                break;
            }
            default:
                break;
        }
    }

    handlerDelete(name, element) {
        switch (name) {
            case 'cmdt': {
                console.log(element);
                break;
            }
            case 'section': {
                console.log(element);
                break;
            }
            case 'brigade': {
                console.log(element);
                break;
            }
            case 'compagnie': {
                console.log(element);
                break;
            }
            case 'brigade compagnie': {
                console.log(element);
                break;
            }
            default:
                break;
        }
    }

    updateCmdt() {
        if (this.inputClassCmdt === 'form-control' && this.readonlyCmdt === false && this.btnAction === 'Enregistrer') {
            console.log(this.cmdtTerritorial);
            this.inputClassCmdt = 'form-control-plaintext';
            this.readonlyCmdt = true;
            this.btnAction = 'Modifier';
        } else {
            this.inputClassCmdt = 'form-control';
            this.readonlyCmdt = false;
            this.btnAction = 'Enregistrer';
        }
    }

    updateSection(section) {
        if (this.selectItem !== '') {
            this.selectItem = '';
            this.btnSousAction = 'Modifier';
        } else {
            this.selectItem = section._id.toString();
            this.btnSousAction = 'Enregistrer';
            console.log(section);
            console.log(this.selectItem);
            console.log(this.btnSousAction);
        }
    }

    updateLegion(legion) {
        console.log(legion);
        if (this.selectItem !== '') {
            this.selectItem = '';
            this.btnSousAction = 'Modifier';
        } else {
            this.selectItem = legion._id.toString();
            this.btnSousAction = 'Enregistrer';
            console.log(legion);
            console.log(this.selectItem);
            console.log(this.btnSousAction);
        }
    }

    updateBrigade(brigade) {
        console.log(brigade);
        if (this.selectItem !== '') {
            this.selectItem = '';
            this.btnSousAction = 'Modifier';
        } else {
            this.selectItem = brigade._id.toString();
            this.btnSousAction = 'Enregistrer';
            console.log(brigade);
            console.log(this.selectItem);
            console.log(this.btnSousAction);
        }
    }

    updateCompagnie(compagnie) {
        if (this.selectItem !== '') {
            this.selectItem = '';
            this.btnSousAction = 'Modifier';
        } else {
            this.selectItem = compagnie._id.toString();
            this.btnSousAction = 'Enregistrer';
            console.log(compagnie);
            console.log(this.selectItem);
            console.log(this.btnSousAction);
        }
    }

    showPanel(name) {
        console.log(name);
        if (name === 'compagnie') {
            this.showPCompagnie === '+' ? this.showPCompagnie = '-' : this.showPCompagnie = '+';
        } else if (name === 'brigade') {
            this.showPBrigade === '+' ? this.showPBrigade = '-' : this.showPBrigade = '+';
        } else if (name === 'section') {
            this.showPSections === '+' ? this.showPSections = '-' : this.showPSections = '+';
        } else if (name === 'brigade compagnie') {
            this.showPBrigadeCompagnie === '+' ? this.showPBrigadeCompagnie = '-' : this.showPBrigadeCompagnie = '+';
        }
    }

    showPanelLegion(index) {
        this.indexLegion = index;
        this.showOneLegion === '+' ? this.showOneLegion = '-' : this.showOneLegion = '+';
    }
}
