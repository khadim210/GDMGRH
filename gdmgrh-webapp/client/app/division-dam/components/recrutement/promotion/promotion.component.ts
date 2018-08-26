import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../website/service/auth.service';
import { DamService } from '../../../service/dam.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../website/service/notification.service';
import { RecrutementEventService } from '../../../service/recrutement-event.service';

@Component({
    selector: 'dam-promotion',
    template: require('./promotion.component.html')
})

export class PromotionComponent implements OnInit {

    promotionList: any;
    promotionForm: any;
    date: any;
    urlCompleted: string;
    tableUpload: string[];
    msgErrorFrom: string;
    btnAction: string;
    askConfirm: any;
    urlpdf: object;

    constructor(
        private authService: AuthService,
        private damService: DamService,
        private router: Router,
        private notificationService: NotificationService,
        private recrutementEventService: RecrutementEventService
    ) {
        this.promotionForm = {};
        this.promotionList = [];
        this.date = new Date();
        this.promotionForm.dateDebut = this.toDayDateFormat(this.date);
        this.promotionForm.dateFin = '';
        this.tableUpload = [];
        this.btnAction = 'Enregistrer';
        this.askConfirm = {};
    }

    ngOnInit() {
        this.getPromotions();
    }

    getPromotions() {
        this.urlCompleted = `${this.authService.getUser().role}`;
        this.damService.getAllPromotion(this.urlCompleted).subscribe(res => {
            if (res.promotion) {
                console.log(res.promotion);
                this.recrutementEventService.announcePromotion(res.promotion);
                this.promotionList = res.promotion;
                this.handlerEditDataFormat();
            } else if (422 === res.status) {
                this.msgErrorFrom = res.error.message;
                this.notificationService.showError('Obtenir Promotion', this.msgErrorFrom);
            }
        });
    }

    initVariable() {
        this.tableUpload = [];
        this.promotionForm = {};
        this.promotionForm.dateDebut = this.toDayDateFormat(this.date);
        this.msgErrorFrom = '';
        this.btnAction = 'Enregistrer';
    }

    handlerEditDataFormat() {
        if (this.promotionList) {
            for (let index = 0; index < this.promotionList.length; index++) {
                this.promotionList[index].dateFin = this.editeDateFormat(this.promotionList[index].dateFin, {nin: 0, max: 10});
                this.promotionList[index].dateDebut = this.editeDateFormat(this.promotionList[index].dateDebut, {nin: 0, max: 10});
            }
        }
    }

    editeDateFormat(date, taille) {
        return new Date(date).toISOString( ).slice(taille.min, taille.max);
    }

    toDayDateFormat(datenow) {
        if (typeof datenow !== 'object') {
            datenow = new Date(datenow);
        }
        if (datenow.getMonth() + 1 < 9) {
            return `${datenow.getFullYear()}-0${datenow.getMonth() + 1}-${datenow.getDate()}`;
        }
        return `${datenow.getFullYear()}-${datenow.getMonth() + 1}-${datenow.getDate()}`;
    }

    createPromotion() {
        if (this.urlCompleted !== 'secretaire') {
            this.promotionForm.active = true;
        }
        this.damService.createPromotion({promotion: this.promotionForm, module: 'DAM'}, this.urlCompleted).subscribe(res => {
            if (res.promotion) {
                this.promotionList = res.promotion;
                this.handlerEditDataFormat();
                this.initVariable();
                console.log(res);
                this.notificationService.showSuccess('Insertion', 'Enregistrement avec succès');
            } else if (422 === res.status) {
                this.msgErrorFrom = res.error.message;
                this.notificationService.showError('Insertion', this.msgErrorFrom);
            }
        });
    }

    onResponseEmit(response) {
        this.promotionForm.ordre = response._id;
    }

    showPromotion(promotion) {
        console.log(promotion);
        this.promotionForm = {...promotion};
        this.btnAction = 'Editer';
        this.urlpdf = {
            url: `http://localhost:9000${promotion.ordre.urlResized}`,
            withCredentials: true
        };
        //this.router.navigate( ['/dam/recrutement/promotion', 'detail' ], {fragment: 'detail'});
    }

    actionPromotion(btnAction) {
        if (btnAction === 'Annuler') {
            this.initVariable();
        } else {
            this.btnAction = 'Appliquer';
        }

    }

    updatePromotion(promotion, action = '') {
        if (action === '') {
            promotion = this.promotionForm;
        } else {
            promotion.status = action;
        }
        this.damService.updatePromotion(promotion, promotion._id, this.urlCompleted).subscribe(res => {
            if (res.promotion) {
                this.promotionList = res.promotion;
                this.handlerEditDataFormat();
                this.initVariable();
                console.log(res.promotion);
            } else if (422 === res.status) {
                this.msgErrorFrom = res.error.message;
                this.notificationService.showError('Mise à Jour', this.msgErrorFrom);
            }
        });
    }

    addCandidat(id) {
        this.router.navigate(['/dam/recrutement/candidature'], { queryParams: { idPromotion: id } });
    }
}
