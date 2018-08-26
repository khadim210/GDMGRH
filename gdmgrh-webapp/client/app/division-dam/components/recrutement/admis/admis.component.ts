import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../website/service/auth.service';
import { DamService } from '../../../service/dam.service';
import { RecrutementEventService } from '../../../service/recrutement-event.service';

@Component({
    selector: 'dam-admis',
    template: require('./admis.component.html')
})

export class AdmisComponent implements OnInit {

    admisList: any;
    promotionList: any;
    admisForm: any;
    urlCompleted: string;
    showPlistPrmotion: string;
    showPListCandidats: string;
    indexPromo: number;

    constructor(
        private authService: AuthService,
        private damService: DamService,
        private recrutementEventService: RecrutementEventService
    ) {
        this.admisList = [];
        this.promotionList = [];
        this.admisForm = {};
        this.showPlistPrmotion = '+';
        this.showPListCandidats = '+';
    }

    ngOnInit() {
        this.getPromotion();
        this.updatePromotion();
    }

    updatePromotion() {
        this.recrutementEventService.promotionAnnounced.subscribe(_promotion => {
            console.log(_promotion);
        });
    }

    getPromotion() {
        this.urlCompleted = this.authService.getUser().role;
        this.damService.getAllPromotion(this.urlCompleted).subscribe(res => {
            if (res.promotion) {
                console.log(res.promotion);
                this.promotionList = this.filterTablePromotion(res.promotion, 'cours');
                this.admisList = this.filterTablePromotion(res.promotion, 'cloture');
            }
        });
    }

    filterTablePromotion(table, status) {
        let tableFilter = [];
        if (table) {
            for (let index = 0; index < table.length; index++) {
                if (table[index].status === status) {
                    tableFilter.push(table[index]);
                }
            }
            table = tableFilter;
        }
        return table;
    }

    showAdmis(admis) {
        console.log(admis);
    }

    showPanel(name, index = null) {
        if (name === 'listPrmotion') {
            this.showPlistPrmotion === '+' ? this.showPlistPrmotion = '-' : this.showPlistPrmotion = '+';
        } else if (name === 'listCandidats') {
            this.indexPromo = index;
            this.showPListCandidats === '+' ? this.showPListCandidats = '-' : this.showPListCandidats = '+';
        }
    }
}
