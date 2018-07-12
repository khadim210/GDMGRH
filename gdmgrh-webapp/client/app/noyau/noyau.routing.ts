import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoyauComponent } from './noyau.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { ListUsersComponent } from './components/user-manager/list-users/list-users.component';
import { ListGroupComponent } from './components/user-manager/list-group/list-group.component';
import { OrganigrammeComponent } from './components/organigramme/organigramme.component';
import { SanctionComponent } from './components/sanction/sanction.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';
import { DiplomesComponent } from './components/diplomes/diplomes.component';
import { GradesComponent } from './components/grades/grades.component';
import { NoyauGuard } from './noyau.guard';
import { PunitionComponent } from './components/sanction/punition/punition.component';
import { RecompenseComponent } from './components/sanction/recompense/recompense.component';
import { EcoleComponent } from './components/organigramme/ecole/ecole.component';
import { AdministratifComponent } from './components/organigramme/administratif/administratif.component';
import { SanteComponent } from './components/organigramme/sante/sante.component';
import { TechniqueComponent } from './components/organigramme/technique/technique.component';
import { InspectionComponent } from './components/organigramme/inspection/inspection.component';
import { EtatMajorComponent } from './components/organigramme/etat-major/etat-major.component';
import { MobileComponent } from './components/organigramme/mobile/mobile.component';
import { TerritorialComponent } from './components/organigramme/territorial/territorial.component';
import { CommandComponent } from './components/organigramme/command/command.component';

const routes: Routes = [
  { path: 'noyau',
    component: NoyauComponent,
    canActivate: [NoyauGuard],
    children: [
      { path: 'dashboad', component: DashboadComponent },
      { path: 'users', component: UserManagerComponent,
        canActivateChild: [NoyauGuard],
        children: [
          { path: 'user-center', component: ListUsersComponent },
          { path: 'group', component: ListGroupComponent },
          { path: '', redirectTo: '/noyau/users/user-center', pathMatch: 'full' }
        ]
      },
      { path: 'sanction', component: SanctionComponent,
        canActivateChild: [NoyauGuard],
        children: [
          { path: 'punition', component: PunitionComponent },
          { path: 'recompense', component: RecompenseComponent },
          { path: '', redirectTo: '/noyau/sanction/punition', pathMatch: 'full' }
        ]
      },
      { path: 'organigramme', component: OrganigrammeComponent,
        children: [
          { path: 'commandement', component: CommandComponent },
          { path: 'ecole', component: EcoleComponent },
          { path: 'administratif', component: AdministratifComponent },
          { path: 'sante', component: SanteComponent },
          { path: 'technique', component: TechniqueComponent },
          { path: 'inspection', component: InspectionComponent },
          { path: 'etat-major', component: EtatMajorComponent },
          { path: 'mobile', component: MobileComponent },
          { path: 'territorial', component: TerritorialComponent },
          { path: '', redirectTo: '/noyau/organigramme/commandement', pathMatch: 'full' }
        ]
      },
      { path: 'diplomes', component: DiplomesComponent },
      { path: 'grades', component: GradesComponent },
      { path: '', redirectTo: '/noyau/dashboad', pathMatch: 'full' }
    ]
  },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class NoyauRoutingModule {

}
