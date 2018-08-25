import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../website/service/auth.service';
import { DgpService } from '../../../service/dgp.service';

@Component({
    selector: 'dgp-gendarmes',
    template: require('./gendarmes.component.html')
})

export class GendarmesComponent implements OnInit {

    role: string;
    agentList: any;

    constructor(
        private router: Router,
        private authService: AuthService,
        private dgpService: DgpService
    ) {
        this.role = '';
    }

    ngOnInit() {
        this.checkUserRole();
        this.getAgents();
    }

    checkUserRole() {
        if (this.authService.getUser().role) {
            this.role = this.authService.getUser().role;
        }
    }

    getAgents(): void {
        this.dgpService.getAgents().subscribe(data => {
            console.log(data.agents);
            if(data.agents.length > 0){
                this.agentList = data.agents
            }
            else {
                this.agentList = null;
            }
        })
    }

    showAgent(event): void{
        this.router.navigate(['dgp/recrutement/liste-gendarmes/details/'+event.target.id]);
    }
}
