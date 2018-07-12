import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'selector-command',
    template: require('./command.component.html')
})

export class CommandComponent implements OnInit {

    hiddenTable: boolean;

    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    navigatTo(position) {
        switch (position) {
            case 'ecole': {
                this.router.navigate(['/noyau/organigramme/ecole']);
                break;
            }
            case 'administratif': {
                this.router.navigate(['/noyau/organigramme/administratif']);
                break;
            }
            case 'sante': {
                this.router.navigate(['/noyau/organigramme/sante']);
                break;
            }
            case 'technique': {
                this.router.navigate(['/noyau/organigramme/technique']);
                break;
            }
            case 'inspection': {
                this.router.navigate(['/noyau/organigramme/inspection']);
                break;
            }
            case 'etat-major': {
                this.router.navigate(['/noyau/organigramme/etat-major']);
                break;
            }
            case 'mobile': {
                this.router.navigate(['/noyau/organigramme/mobile']);
                break;
            }
            case 'territorial': {
                this.router.navigate(['/noyau/organigramme/territorial']);
                break;
            }
            default:
                break;
        }
    }
}
