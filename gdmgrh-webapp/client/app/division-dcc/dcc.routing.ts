import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DccComponent } from './dcc.component';
import { DccGuard } from './dcc.guard';
import { DccDashboadComponent } from './components/dcc-dashboad/dcc-dashboad.component';

const routes: Routes = [
  { path: 'dcc',
    component: DccComponent,
    canActivate: [DccGuard],
    children: [
        { path: '', redirectTo: '/dcc/dashboad', pathMatch: 'full' },
        { path: 'dashboad', component: DccDashboadComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DccRoutingModule { }
