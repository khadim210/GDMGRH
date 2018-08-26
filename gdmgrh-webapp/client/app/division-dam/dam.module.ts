import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WebsiteModule } from '../website/website.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { DamComponent } from './dam.component';
import { DamRoutingModule } from './dam.routing';
import { DamGuard } from './dam.guard';
import { DamService } from './service/dam.service';
import { DamDashboadComponent } from './components/dam-dashboad/dam-dashboad.component';
import { RecrutementComponent } from './components/recrutement/recrutement.component';
import { ReservisteComponent } from './components/reserviste/reserviste.component';
import { GendarmeAuxiliaireComponent } from './components/gendarme-auxiliaire/gendarme-auxiliaire.component';
import { ArchiveDamComponent } from './components/archive-dam/archive-dam.component';
import { PromotionComponent } from './components/recrutement/promotion/promotion.component';
import { CandidatureComponent } from './components/recrutement/candidature/candidature.component';
import { NoteComponent } from './components/recrutement/note/note.component';
import { AdmisComponent } from './components/recrutement/admis/admis.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { MutationDamComponent } from './components/mutation-dam/mutation-dam.component';
import { ValidationComponent } from './components/validation/validation.component';
import { RecrutementEventService } from './service/recrutement-event.service';


@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        WebsiteModule,
        DamRoutingModule,
        ToastModule.forRoot()
    ],
    exports: [],
    declarations: [
        DamComponent,
        DamDashboadComponent,
        RecrutementComponent,
        ReservisteComponent,
        GendarmeAuxiliaireComponent,
        ArchiveDamComponent,
        PromotionComponent,
        CandidatureComponent,
        NoteComponent,
        AdmisComponent,
        StatistiqueComponent,
        MutationDamComponent,
        ValidationComponent
    ],
    providers: [
        DamService,
        DamGuard,
        RecrutementEventService
    ],
})
export class DamModule { }
