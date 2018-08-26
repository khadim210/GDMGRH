import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../website/service/auth.service';
import { DamService } from '../../service/dam.service';

@Component({
    selector: 'dam-gendarme-auxiliaire',
    template: require('./gendarme-auxiliaire.component.html')
})

export class GendarmeAuxiliaireComponent implements OnInit {

    gendarmeauxiliaireList: any;
    gendarmeauxiliaireForm: any;
    tableUpload: any;
    urlCompleted: string;
    promotion: string;
    src: string;
    msgErrorFrom: string;
    idPicture: string;

    constructor(
        private authService: AuthService,
        private damService: DamService
    ) {
        this.gendarmeauxiliaireList = [];
        this.gendarmeauxiliaireForm = {};
        this.gendarmeauxiliaireForm.fichierJoint = [];
        this.tableUpload = [];
        this.urlCompleted = '';
        this.src = '';
        this.msgErrorFrom = '';
    }

    ngOnInit() {
        this.getPromotions();
    }

    getPromotions() {
        this.urlCompleted = `/${this.authService.getUser().role}` || '';
    }

    showGendarmeAuxiliaire(gendarme) {
        console.log(gendarme);
    }

    onResponsePictureEmit(picture) {
        this.idPicture = picture._id;
        this.src = picture.urlResized;
    }

    onResponseFileEmit(response) {
        this.gendarmeauxiliaireForm.fichierJoint.push(response._id);
    }

    createGendarme() {
        console.log(this.gendarmeauxiliaireForm);
        this.gendarmeauxiliaireForm.fichierJoint.push(this.idPicture);
        this.damService.createAuxiliaire({auxiliaire: this.gendarmeauxiliaireForm}).subscribe(res => {
            if (res.storeResponse) {
                console.log(res);

            } else if (422 === res.status) {
                this.msgErrorFrom = res.error.message;
            }
        })
    }
}
