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
            { path: 'sessions', component: ConcoursExamComponent },
            { path: 'nouvelle-session', component: EvaluationConcoursComponent },
            { path: '', redirectTo: '/dif/formation/sessions', pathMatch: 'full' }
          ]
        },
        { path: 'diplomes', component: ConcoursproComponent,
          canActivateChild: [DifGuard],
          children: [
            { path: 'encours', component: ConcoursExamComponent },
            { path: 'nouvelle-demande', component: EvaluationConcoursComponent },
            { path: 'traitees', component: EvaluationConcoursComponent },
            { path: '', redirectTo: '/dif/diplomes/encours', pathMatch: 'full' }
          ]
        },
        { path: 'archives', component: ConcoursproComponent,
          canActivateChild: [DifGuard],
          children: [
            { path: 'liste', component: ConcoursExamComponent },
            { path: 'nouvelle-archive', component: EvaluationConcoursComponent },
            { path: '', redirectTo: '/dif/archives/liste', pathMatch: 'full' }
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
