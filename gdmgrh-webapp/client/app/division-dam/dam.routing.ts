import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DamComponent } from './dam.component';
import { DamGuard } from './dam.guard';
import { DamDashboadComponent } from './components/dam-dashboad/dam-dashboad.component';

const routes: Routes = [
  { path: 'dam',
    component: DamComponent,
    canActivate: [DamGuard],
    children: [
        { path: '', redirectTo: '/dam/dashboad', pathMatch: 'full' },
        { path: 'dashboad', component: DamDashboadComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DamRoutingModule { }
