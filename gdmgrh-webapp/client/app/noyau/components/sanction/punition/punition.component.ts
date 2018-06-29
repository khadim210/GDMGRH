import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SanctionService } from '../../../service/sanction.service';
import { PunitionModel } from '../../../model/punition.model';
import { interval } from 'rxjs/observable/interval';

@Component({
    selector: 'selector-punition',
    template: require('./punition.component.html')
})
export class PunitionComponent implements OnInit {

    datas: PunitionModel[];
    recompenses: PunitionModel[];

    libelles: any;
    punition_edited: PunitionModel;
    type_punition_edited: String;
    type_officier_edited: String;
    nom_punition_edited: String;

    code_deleted: any;
    succes_action = false;

    filter: String;

    constructor(
      private recompenseService: SanctionService
    ) {
        this.datas = [];
        this.recompenses = [];
        this.libelles = [];
    }


  ngOnInit() {

    this.recompenseService.getPunitions()
      .subscribe(data => this.datas = data);

      // for (let _i = 0; _i < data.length; _i++) {
          // for (let _j = 0; _j < data[_i].intitules.length; _j++) {
            // tslint:disable-next-line:max-line-length
            // this.datas.push({_id: data[_i].intitules[_j]['_id'], nom_recompense: data[_i].intitules[_j]['nom_recompense'], type_recompense: data[_i].type_recompense});
          // }
        // }
  }
  btnEdit(item: PunitionModel): void {
    this.punition_edited = item;
    // this.name_edited = this.recompense_edited.nom_recompense;
    this.type_punition_edited = item.type_punition;
    this.type_officier_edited = item.type_officier;
    this.nom_punition_edited = item.nom_punition;
  }

  btnDelete(item: any): void {
    this.code_deleted = item;
  }

  delete(): void {
    // tslint:disable-next-line:prefer-const
    let index = this.datas.indexOf(this.code_deleted);

    if (index >= 0) {
      this.datas.splice(index, 1);
      this.recompenseService.deletePunition(this.code_deleted._id)
      .subscribe(
        data => {
          this.alert_action();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  editerRecompense(type_p, type_o, nom_p): void {

   this.punition_edited.nom_punition = nom_p;
   this.punition_edited.type_officier = type_o;
   this.punition_edited.type_punition = type_p;

    this.recompenseService.editPunition(this.punition_edited)
    .subscribe(
      data => {
        this.alert_action();
      }
    );
  }

  recordPunition(item: NgForm): void {
    const tamponPunition = {
      type_punition: item.value.type_punition,
      type_officier: item.value.type_officier,
      nom_punition: item.value.nom_punition
    };
    this.recompenseService.addPunition(tamponPunition)
      .subscribe(
        data => {
          // tslint:disable-next-line:max-line-length
          this.datas.push({_id: data[' _id '], type_punition: data[' type_punition '], type_officier: data[' type_officier '], nom_punition: data[' nom_punition ']});
          this.alert_action();
        }
      );
  }

  alert_action() {
    this.succes_action = true;
    interval(6500)
      .subscribe(res => this.succes_action = false);
  }

}
