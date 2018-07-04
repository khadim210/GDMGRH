import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WebsiteModule } from '../website/website.module';
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

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        DifRoutingModule,
        ReactiveFormsModule,
        WebsiteModule
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
    ],
    providers: [
        DifGuard
    ],
})
export class DifModule { }
