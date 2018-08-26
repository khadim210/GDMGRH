import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DamService } from '../../../service/dam.service';
import { AuthService } from '../../../../website/service/auth.service';
import { NotificationService } from '../../../../website/service/notification.service';
import { RecrutementEventService } from '../../../service/recrutement-event.service';

@Component({
    selector: 'dam-candidature',
    template: require('./candidature.component.html')
})

export class CandidatureComponent implements OnInit {

    candidatList: any;
    promotionList: any;
    candidatFrom: any;
    tableUpload: any;
    urlCompleted: string;
    promotion: string;
    src: string;
    msgErrorFrom: string;
    idPicture: string;
    date: Date;
    year: number;
    btnAction: string;
    askConfirm: any;
    showFileUpload: any;

    constructor(
        private route: ActivatedRoute,
        private damService: DamService,
        private authService: AuthService,
        private notificationService: NotificationService,
        private recrutementEventService: RecrutementEventService
    ) {
        this.promotionList = [];
        this.candidatList = [];
        this.candidatFrom = {};
        this.candidatFrom.fichierJoint = [];
        this.tableUpload = [];
        this.urlCompleted = '';
        this.src = '';
        this.msgErrorFrom = '';
        this.date = new Date();
        this.date = new Date(this.toDayDateFormat(this.date));
        this.btnAction = 'Enregistrer';
        this.askConfirm = {};
        this.idPicture = '';
        this.showFileUpload = [];
    }

    toDayDateFormat(datenow) {
        this.year = datenow.getFullYear() - 29;
        return `${this.year}-01-01`;
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            if (params.get('idPromotion')) {
                this.promotion = params.get('idPromotion');
            }
        });
        this.urlCompleted = `${this.authService.getUser().role}`;
        this.getPromotions();
        this.getCandidats();
        this.updatePromotion();
    }

    updatePromotion() {
        this.recrutementEventService.promotionAnnounced.subscribe(_promotion => {
            console.log(_promotion);
        });
    }

    initVariable() {
        this.tableUpload = [];
        this.candidatFrom = {};
        this.candidatFrom.fichierJoint = [];
        this.date = new Date(this.toDayDateFormat(this.date));
        this.msgErrorFrom = '';
        this.btnAction = 'Enregistrer';
        this.idPicture = '';
        this.src = '';
        this.showFileUpload = [];
    }

    getPromotions() {
        this.damService.getAllPromotion(this.urlCompleted).subscribe(res => {
            if (res.promotion) {
                this.promotionList = res.promotion;
                this.filterTablePromotion();
            } else if (422 === res.status) {
                this.msgErrorFrom = res.error.message;
                this.notificationService.showError('Obtenir Promotion', this.msgErrorFrom);
            }
        });
    }

    filterTablePromotion() {
        let table = [];
        if (this.promotionList) {
            for (let index = 0; index < this.promotionList.length; index++) {
                if (this.promotionList[index].status === 'cours') {
                    table.push(this.promotionList[index]);
                }
            }
            this.promotionList = table;
        }
    }

    getCandidats() {
        this.damService.getAllCandidat(this.urlCompleted).subscribe(res => {
            if (res.candidats) {
                this.candidatList = res.candidats;
                this.editCandidatInformation();
            } else if (422 === res.status) {
                this.msgErrorFrom = res.error.message;
                this.notificationService.showError('Obtenir Candidat', this.msgErrorFrom);
            }
        });
    }

    editCandidatInformation() {
        for (let keyCandidat = 0; keyCandidat < this.candidatList.length; keyCandidat++) {
            this.candidatList[keyCandidat].promotion = '';
            const candidat = this.candidatList[keyCandidat];
            for (let keyPromo = 0; keyPromo < this.promotionList.length; keyPromo++) {
                this.candidatList[keyCandidat].promotion = this.searchCandidatInPromotion(this.promotionList, candidat).libelle;
            }
            let date = this.candidatList[keyCandidat].dateNaissance;
            this.candidatList[keyCandidat].dateNaissance = this.editeDateFormat(date, {nin: 0, max: 10});
        }
    }

    searchCandidatInPromotion(listPromo, infoCandidat) {
        for (let keyPromo = 0; keyPromo < listPromo.length; keyPromo++) {
            const candidatPromos = listPromo[keyPromo].candidats;
            for (let keyCandt = 0; keyCandt < candidatPromos.length; keyCandt++) {
                if (candidatPromos[keyCandt]._id.toString() === infoCandidat._id.toString()) {
                    return listPromo[keyPromo];
                }
            }
        }
    }

    editeDateFormat(date, taille) {
        return new Date(date).toISOString( ).slice(taille.min, taille.max);
    }

    onResponsePictureEmit(picture) {
        console.log(picture);
        if (this.idPicture !== '' && this.candidatFrom.fichierJoint) {
            if (this.candidatFrom.fichierJoint.length) {
                this.candidatFrom.fichierJoint = this.candidatFrom.fichierJoint.filter(_file => this.idPicture !== _file);
            }
        }
        this.idPicture = picture._id;
        this.src = picture.urlResized;
        this.candidatFrom.fichierJoint.push(this.idPicture);
    }

    onResponseFileEmit(response) {
        console.log(response);
        this.candidatFrom.fichierJoint.push(response._id);
    }

    createCandidat() {
        console.log(this.candidatFrom);
        this.damService.createCandidat(this.urlCompleted, {candidat: this.candidatFrom, promotion: this.promotion}).subscribe(res => {
            if (res.storeResponse) {
                console.log(res);
                this.recrutementEventService.announcePromotion(res.promotion);
                this.promotionList = res.promotion;
                this.filterTablePromotion();
                this.candidatList = res.storeResponse;
                this.editCandidatInformation();
                this.notificationService.showSuccess('Insertion', 'Enregistrement avec succès');
            } else if (422 === res.status) {
                this.msgErrorFrom = res.error.message;
                this.notificationService.showError('Insertion', this.msgErrorFrom);
            }
        });
    }

    showCandidat(candidat) {
        this.showFileUpload = [];
        this.candidatFrom.fichierJoint = [];
        for (let keyFile = 0; keyFile < candidat.fichierJoint.length; keyFile++) {
            if (!(RegExp('photo profile').test(candidat.fichierJoint[keyFile].description.toString()))) {
                this.showFileUpload.push(candidat.fichierJoint[keyFile]);
            } else {
                this.idPicture = candidat.fichierJoint[keyFile]._id;
                this.src = candidat.fichierJoint[keyFile].urlResized;
            }
            this.candidatFrom.fichierJoint.push(candidat.fichierJoint[keyFile]._id);
        }
        this.candidatFrom = {...candidat};
        this.btnAction = 'Editer';
    }

    actionPromotion(btnAction) {
        if (btnAction === 'Annuler') {
            this.initVariable();
        } else {
            this.btnAction = 'Appliquer';
            this.promotion = this.searchCandidatInPromotion(this.promotionList, this.candidatFrom)._id;
        }
    }

    updateCandidat() {
        this.candidatFrom.promotion = this.promotion;
        this.damService.updateCandidat(this.urlCompleted, this.candidatFrom, this.candidatFrom._id).subscribe(res => {
            console.log(res);
            if (res.updateResponse) {
                this.recrutementEventService.announcePromotion(res.promotion);
                this.promotionList = res.promotion;
                this.filterTablePromotion();
                this.candidatList = res.updateResponse;
                this.editCandidatInformation();
                this.notificationService.showSuccess('Mise à Jour', 'Effectuer avec succès');
                this.initVariable();
            } else if (422 === res.status) {
                this.msgErrorFrom = res.error.message;
                this.notificationService.showError('Mise à Jour', this.msgErrorFrom);
            }
        });
    }
}
