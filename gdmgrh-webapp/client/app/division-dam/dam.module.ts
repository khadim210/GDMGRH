import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WebsiteModule } from '../website/website.module';

import { DamComponent } from './dam.component';
import { DamRoutingModule } from './dam.routing';
import { DamGuard } from './dam.guard';
import { DamService } from './service/dam.service';
import { DamDashboadComponent } from './components/dam-dashboad/dam-dashboad.component';
import { RecrutementComponent } from './components/recrutement/recrutement.component';
import { ReservisteComponent } from './components/reserviste/reserviste.component';
import { GendarmeAuxiliaireComponent } from './components/gendarme-auxiliaire/gendarme-auxiliaire.component';
import { SessionComponent } from './components/recrutement/session/session.component';
import { CandidatureComponent } from './components/recrutement/candidature/candidature.component';
import { NoteComponent } from './components/recrutement/note/note.component';
import { AdmisComponent } from './components/recrutement/admis/admis.component';


@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        WebsiteModule,
        DamRoutingModule
    ],
    exports: [],
    declarations: [
        DamComponent,
        DamDashboadComponent,
        RecrutementComponent,
        ReservisteComponent,
        GendarmeAuxiliaireComponent,
        SessionComponent,
        CandidatureComponent,
        NoteComponent,
        AdmisComponent
    ],
    providers: [
        DamService,
        DamGuard
    ],
})
export class DamModule { }
