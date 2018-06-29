import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DifComponent } from './dif.component';
import { DifGuard } from './dif.guard';
import { DifDashboadComponent } from './components/dif-dashboad/dif-dashboad.component';

const routes: Routes = [
  { path: 'dif',
    component: DifComponent,
    canActivate: [DifGuard],
    children: [
        { path: '', redirectTo: '/dif/dashboad', pathMatch: 'full' },
        { path: 'dashboad', component: DifDashboadComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DifRoutingModule { }
