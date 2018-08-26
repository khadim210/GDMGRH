import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../service/organigramme.service';
import { NotificationService } from '../../../../website/service/notification.service';

@Component({
    selector: 'selector-mobile',
    template: require('./mobile.component.html')
})

export class MobileComponent implements OnInit {

    cmdtMobile: any;
    inputClassCmdt: string;
    readonlyCmdt: boolean;
    btnAction: string;
    btnSousAction: string;
    selectItem: string;
    btndisabled: boolean;
    showPUnites: string;
    indexLegion: string;
    showPLegions: string;
    showPEscadrons: string;

    constructor(
        private organigrammeService: OrganigrammeService,
        private notificationService: NotificationService,
    ) {
        this.cmdtMobile = {};
        this.cmdtMobile.legion = [];
        this.cmdtMobile.unite = [];
        this.inputClassCmdt = 'form-control-plaintext';
        this.readonlyCmdt = true;
        this.btnAction = 'Modifier';
        this.btnSousAction = '';
        this.selectItem = '';
        this.btndisabled = false;
        this.showPUnites = '+';
        this.showPLegions = '+';
        this.showPEscadrons = '+';
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
                console.log(this.cmdtMobile);
            }
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
            case 'unite': {
                console.log(element);
                break;
            }
            case 'escadron': {
                console.log(element);
                break;
            }
            case 'legion': {
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
            case 'unite': {
                console.log(element);
                break;
            }
            case 'escadron': {
                console.log(element);
                break;
            }
            case 'legion': {
                console.log(element);
                break;
            }
            default:
                break;
        }
    }

    updateCmdt() {
        if (this.inputClassCmdt === 'form-control' && this.readonlyCmdt === false && this.btnAction === 'Enregistrer') {
            console.log(this.cmdtMobile);
            this.inputClassCmdt = 'form-control-plaintext';
            this.readonlyCmdt = true;
            this.btnAction = 'Modifier';
        } else {
            this.inputClassCmdt = 'form-control';
            this.readonlyCmdt = false;
            this.btnAction = 'Enregistrer';
        }
    }

    updateLegion(division) {
        if (this.selectItem !== '') {
            this.selectItem = '';
            this.btnSousAction = 'Modifier';
            this.btndisabled = false;
        } else {
            this.selectItem = division._id.toString();
            this.btnSousAction = 'Enregistrer';
            this.btndisabled = true;
            console.log(division);
            console.log(this.selectItem);
            console.log(this.btnSousAction);
        }
    }

    updateUnite(unite) {
        if (this.selectItem !== '') {
            this.selectItem = '';
            this.btnSousAction = 'Modifier';
            this.btndisabled = false;
        } else {
            this.selectItem = unite._id.toString();
            this.btnSousAction = 'Enregistrer';
            this.btndisabled = true;
            console.log(unite);
            console.log(this.selectItem);
            console.log(this.btnSousAction);
        }
    }

    updateEscadron(escadron) {
        if (this.selectItem !== '') {
            this.selectItem = '';
            this.btnSousAction = 'Modifier';
            this.btndisabled = false;
        } else {
            this.selectItem = escadron._id.toString();
            this.btnSousAction = 'Enregistrer';
            this.btndisabled = true;
            console.log(escadron);
            console.log(this.selectItem);
            console.log(this.btnSousAction);
        }
    }

    showPanel(name, index = null) {
        if (name === 'unite') {
            this.showPUnites === '+' ? this.showPUnites = '-' : this.showPUnites = '+';
        } else if (name === 'legion') {
            this.showPLegions === '+' ? this.showPLegions = '-' : this.showPLegions = '+';
        } else if (name === 'escadron') {
            this.indexLegion = index;
            this.showPEscadrons === '+' ? this.showPEscadrons = '-' : this.showPEscadrons = '+';
        }
    }
}
