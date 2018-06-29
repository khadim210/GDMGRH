import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DgpComponent } from './dgp.component';
import { DgpGuard } from './dgp.guard';
import { DgpDashboadComponent } from './components/dgp-dashboad/dgp-dashboad.component';

const routes: Routes = [
  { path: 'dgp',
    component: DgpComponent,
    canActivate: [DgpGuard],
    children: [
        { path: '', redirectTo: '/dgp/dashboad', pathMatch: 'full' },
        { path: 'dashboad', component: DgpDashboadComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DgpRoutingModule { }
