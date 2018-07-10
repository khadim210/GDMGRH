import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SanctionService } from '../../../service/sanction.service';
import { PunitionModel } from '../../../model/punition.model';
import { interval } from 'rxjs/observable/interval';

@Component({
    selector: 'selector-punition',
    template: require('./punition.component.html'),
    styles: [`
      @keyframes masuperanimation {
        0% {
            transform: translateX(150px);
        }
        -50% {
            transform: translateX(150px);
        }
        -100% {
            transform: translateX(150px) rotate(15deg);
        }
      }
      .w3-display-topright {
        position: absolute;
        right: 0;
        top: 0
      }
      .w3-padding {
        padding: 8px 16px!important
      }
      .alert {
        animation: masuperanimation 2s;
      }

    `]
})
export class PunitionComponent implements OnInit {

    punition_data: any[];

    punition_edited: PunitionModel;
    type_punition_edited: String;
    type_officier_edited: String;
    nom_punition_edited: String;

    code_deleted: any;

    constructor(
      private recompenseService: SanctionService
    ) {
        this.punition_data = [];
    }


  ngOnInit() {

    this.recompenseService.getPunitions()
      .subscribe(data => this.punition_data = data);
  }
  btnEdit(item: PunitionModel): void {
    this.punition_edited = item;

    this.type_punition_edited = item.type_punition;
    this.type_officier_edited = item.type_officier;
    this.nom_punition_edited = item.nom_punition;
  }

  btnDelete(item: any): void {
    this.code_deleted = item;
  }

  deletePunition(): void {
      this.recompenseService.deletePunition(this.code_deleted._id)
      .subscribe(
        data => {
          this.punition_data = data;
        }, error => {
          console.log(error);
        }
      );
  }

  upgradePunition(type_p, type_o, nom_p): void {

   this.punition_edited.nom_punition = nom_p;
   this.punition_edited.type_officier = type_o;
   this.punition_edited.type_punition = type_p;

    this.recompenseService.editPunition(this.punition_edited)
    .subscribe(
      data => {
        this.punition_data = data;
      }
    );
  }

  addPunition(item: NgForm): void {
    const tamponPunition = {
      type_punition: item.value.type_punition,
      type_officier: item.value.type_officier,
      nom_punition: item.value.nom_punition
    };
    this.recompenseService.addPunition(tamponPunition)
      .subscribe(
        data => {
          this.punition_data = data;
        }
      );
  }

}
