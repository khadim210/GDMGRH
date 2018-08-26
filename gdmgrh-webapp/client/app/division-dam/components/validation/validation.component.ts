import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../website/service/auth.service';
import { DamService } from '../../service/dam.service';

@Component({
    selector: 'dam-validation',
    template: require('./validation.component.html')
})

export class ValidationComponent implements OnInit {

    validationList: any;
    msgError: string;
    role: string;

    constructor(
        private authService: AuthService,
        private damService: DamService
    ) {
        this.validationList = [];
        this.role = '';
    }

    ngOnInit() {
        this.getValidationRole();
    }

    getValidationRole() {
        if (this.authService.getUser().role) {
            this.role = this.authService.getUser().role;
        }
        this.damService.getAllValidation().subscribe(res => {
            if (res.validations) {
                this.validationList = res.validations;
                this.filterTable();
            } else if (422 === res.status) {
                this.msgError = res.error.message;
            }
        });
    }

    filterTable() {
        let table = [];
        if (this.validationList) {
            for (let index = 0; index < this.validationList.length; index++) {
                if (this.validationList[index].division === this.authService.getUser().group
                    && this.validationList[index].status !== 'valider') {
                    table.push(this.validationList[index]);
                }
            }
            this.validationList = table;
        }
    }

    showvalidation(validation) {
        validation.status = 'valider';
        this.damService.updateValidation(validation, validation._id).subscribe(res => {
            if (res) {
                console.log(res);
            } else if (422 === res.status) {
                console.log(res.error.message);
            }
        });
    }

    showrevue(validation) {

    }

    showmodifier(validation) {

    }
}
