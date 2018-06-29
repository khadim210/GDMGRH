import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralComponent } from './general.component';
import { GeneralGuard } from './general.guard';
import { GeneralDashboadComponent } from './components/general-dashboad/general-dashboad.component';

const routes: Routes = [
  { path: 'general',
    component: GeneralComponent,
    canActivate: [GeneralGuard],
    children: [
        { path: '', redirectTo: '/general/dashboad', pathMatch: 'full' },
        { path: 'dashboad', component: GeneralDashboadComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule { }
