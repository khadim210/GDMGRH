import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DifComponent } from './dif.component';
import { DifGuard } from './dif.guard';
import { DifDashboadComponent } from './components/dif-dashboad/dif-dashboad.component';
import { InstructionpersonnelComponent } from './components/instruction-personnel/instruction-personnel.component';
import { InstructionComponent } from './components/instruction-personnel/instruction/instruction.component';
import { EvaluationComponent } from './components/instruction-personnel/evaluation/evaluation.component';
import { ConcoursproComponent } from './components/concours-pro/concours-pro.component';
import { ConcoursExamComponent } from './components/concours-pro/concours-examens/concours-examens.component';
import { EvaluationConcoursComponent } from './components/concours-pro/evaluation/evaluation.component';
import { FormationComponent } from './components/formation/formation.component';
import { DashboardformationComponent } from './components/formation/dashboard/dashboardformation.component';
import { StagesComponent } from './components/formation/stages/stages.component';
import { DesignationsComponent } from './components/formation/designations/designations.component';
import { DiplomesHomologationComponent } from './components/diplomes/diplomes.component';
import { DashboardhomologationComponent } from './components/diplomes/dashboard/dashboardhomologation.component';
import { EncoursComponent } from './components/diplomes/encours/encours.component';
import { TraiteesComponent } from './components/diplomes/traitees/traitees.component';
import { ArchivesDIFComponent } from './components/archives/archives.component';

const routes: Routes = [
  { path: 'dif',
    component: DifComponent,
    canActivate: [DifGuard],
    children: [
        { path: '', redirectTo: '/dif/dashboad', pathMatch: 'full' },
        { path: 'dashboad', component: DifDashboadComponent },
        { path: 'instruction', component: InstructionpersonnelComponent,
          canActivateChild: [DifGuard],
          children: [
            { path: 'instruction', component: InstructionComponent },
            { path: 'evaluation', component: EvaluationComponent },
            { path: '', redirectTo: '/dif/instruction/instruction', pathMatch: 'full' }
          ]
        },
        { path: 'concours-pro', component: ConcoursproComponent,
          canActivateChild: [DifGuard],
          children: [
            { path: 'concours-examens', component: ConcoursExamComponent },
            { path: 'evaluation', component: EvaluationConcoursComponent },
            { path: '', redirectTo: '/dif/concours-pro/concours-examens', pathMatch: 'full' }
          ]
        },
        { path: 'formation', component: ConcoursproComponent,
          canActivateChild: [DifGuard],
          children: [
            { path: 'dashboard', component: DashboardformationComponent },
            { path: 'stages', component: StagesComponent },
            { path: 'designations', component: DesignationsComponent },
            { path: '', redirectTo: '/dif/formation/dashboard', pathMatch: 'full' }
          ]
        },
        { path: 'diplomes', component: ConcoursproComponent,
          canActivateChild: [DifGuard],
          children: [
            { path: 'dashboard', component: DashboardhomologationComponent },
            { path: 'encours', component: EncoursComponent },
            { path: 'traitees', component: TraiteesComponent },
            { path: '', redirectTo: '/dif/diplomes/dashboard', pathMatch: 'full' }
          ]
        },
        { path: 'archives', component: ArchivesDIFComponent,
          canActivateChild: [DifGuard],
          children: [
            
          ]
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DifRoutingModule { }
