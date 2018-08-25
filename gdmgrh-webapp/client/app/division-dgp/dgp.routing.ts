import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DgpComponent } from './dgp.component';
import { DgpGuard } from './dgp.guard';
import { DgpDashboadComponent } from './components/dgp-dashboad/dgp-dashboad.component';
import { DgpArchivesComponent } from './components/dgp-archives/dgp-archives.component';
import { DgpAuxiliaireComponent } from './components/dgp-auxiliaire/dgp-auxiliaire.component';
import { DgpRecrutementComponent } from './components/dgp-recrutement/dgp-recrutement.component';
import { DgpReservisteComponent } from './components/dgp-reserviste/dgp-reserviste.component';
import { ProfilComponent } from './components/dgp-recrutement/profil/profil.component';
import { InfosGeneralesComponent } from './components/dgp-recrutement/profil/infos-generales/infos-generales.component';
import { GendarmesComponent } from './components/dgp-recrutement/gendarmes/gendarmes.component';
import { InfosGradesComponent } from './components/dgp-recrutement/profil/infos-grades/infos-grades.component';
import { InfosProfessionnellesComponent } from './components/dgp-recrutement/profil/infos-professionnelles/infos-professionnelles.component';
import { InfosSpecialesComponent } from './components/dgp-recrutement/profil/infos-speciales/infos-speciales.component';
import { DetailsGendarmesComponent } from './components/dgp-recrutement/gendarmes/details-gendarme/details-gendarme.component';

const routes: Routes = [
  { path: 'dgp',
    component: DgpComponent,
    canActivate: [DgpGuard],
    children: [
        { path: '', redirectTo: '/dgp/dashboad', pathMatch: 'full' },
        { path: 'dashboad', component: DgpDashboadComponent },
        { path: 'auxiliaire', component: DgpAuxiliaireComponent },
        { path: 'archive', component: DgpArchivesComponent },
        { path: 'recrutement',
          component: DgpRecrutementComponent,
          children: [
            { path: '', redirectTo: '/dgp/recrutement/liste-gendarmes', pathMatch: 'full' },
            { path: 'profil',
              component: ProfilComponent,
              children: [
                { path: '', redirectTo: '/dgp/recrutement/profil/infos-generales', pathMatch: 'full' },
                { path: 'infos-generales', component: InfosGeneralesComponent },
                { path: 'infos-speciales', component: InfosSpecialesComponent },
                { path: 'infos-pro', component: InfosProfessionnellesComponent },
                { path: 'infos-grades', component: InfosGradesComponent },
              ],
            },
            { path: 'liste-gendarmes', component: GendarmesComponent,},
            { path: 'liste-gendarmes/details/:id', component: DetailsGendarmesComponent },
          ],
        },
        { path: 'reserviste', component: DgpReservisteComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DgpRoutingModule { }
