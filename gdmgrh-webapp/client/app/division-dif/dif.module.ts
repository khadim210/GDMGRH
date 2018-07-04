import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NoyauModule } from '../noyau/noyau.module';
import { DifComponent } from './dif.component';
import { DifDashboadComponent } from './components/dif-dashboad/dif-dashboad.component';
import { DifGuard } from './dif.guard';
import { DifRoutingModule } from './dif.routing';
import { ReactiveFormsModule } from '@angular/forms';

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

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        NoyauModule,
        DifRoutingModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        DifComponent,
        DifDashboadComponent,
        InstructionpersonnelComponent,
        InstructionComponent,
        EvaluationComponent,
        ConcoursproComponent,
        ConcoursExamComponent,
        EvaluationConcoursComponent,
        FormationComponent,
        DashboardformationComponent,
        StagesComponent,
        DesignationsComponent,
        DashboardhomologationComponent,
        DiplomesHomologationComponent,
        EncoursComponent,
        TraiteesComponent,
        ArchivesDIFComponent,
    ],
    providers: [
        DifGuard
    ],
})
export class DifModule { }
