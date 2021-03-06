import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DamComponent } from './dam.component';
import { DamGuard } from './dam.guard';
import { DamDashboadComponent } from './components/dam-dashboad/dam-dashboad.component';
import { RecrutementComponent } from './components/recrutement/recrutement.component';
import { ReservisteComponent } from './components/reserviste/reserviste.component';
import { GendarmeAuxiliaireComponent } from './components/gendarme-auxiliaire/gendarme-auxiliaire.component';
import { ArchiveDamComponent } from './components/archive-dam/archive-dam.component';
import { PromotionComponent } from './components/recrutement/promotion/promotion.component';
import { CandidatureComponent } from './components/recrutement/candidature/candidature.component';
import { NoteComponent } from './components/recrutement/note/note.component';
import { AdmisComponent } from './components/recrutement/admis/admis.component';

const routes: Routes = [
  { path: 'dam',
    component: DamComponent,
    canActivate: [DamGuard],
    children: [
        { path: '', redirectTo: '/dam/dashboad', pathMatch: 'full' },
        { path: 'dashboad', component: DamDashboadComponent },
        { path: 'recrutement',
          component: RecrutementComponent,
          canActivateChild: [DamGuard],
          children: [
            { path: '', redirectTo: '/dam/recrutement/promotion', pathMatch: 'full' },
            { path: 'promotion', component: PromotionComponent },
            { path: 'candidature', component: CandidatureComponent },
            { path: 'note', component: NoteComponent },
            { path: 'admis', component: AdmisComponent },
          ],
        },
        { path: 'reserviste', component: ReservisteComponent },
        { path: 'auxiliaire', component: GendarmeAuxiliaireComponent },
        { path: 'archive', component: ArchiveDamComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DamRoutingModule { }
