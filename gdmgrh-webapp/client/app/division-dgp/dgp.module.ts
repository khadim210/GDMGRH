import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WebsiteModule } from '../website/website.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DgpService } from './service/dgp.service';
import { DgpComponent } from './dgp.component';
import { DgpDashboadComponent } from './components/dgp-dashboad/dgp-dashboad.component';
import { DgpArchivesComponent } from './components/dgp-archives/dgp-archives.component';
import { DgpAuxiliaireComponent } from './components/dgp-auxiliaire/dgp-auxiliaire.component';
import { DgpRecrutementComponent } from './components/dgp-recrutement/dgp-recrutement.component';
import { DgpReservisteComponent } from './components/dgp-reserviste/dgp-reserviste.component';
import { ProfilComponent } from './components/dgp-recrutement/profil/profil.component';
import { InfosGeneralesComponent } from './components/dgp-recrutement/profil/infos-generales/infos-generales.component';
import { GendarmesComponent } from './components/dgp-recrutement/gendarmes/gendarmes.component';
import { DgpGuard } from './dgp.guard';
import { DgpRoutingModule } from './dgp.routing';
import { InfosGradesComponent } from './components/dgp-recrutement/profil/infos-grades/infos-grades.component';
import { InfosProfessionnellesComponent } from './components/dgp-recrutement/profil/infos-professionnelles/infos-professionnelles.component';
import { InfosSpecialesComponent } from './components/dgp-recrutement/profil/infos-speciales/infos-speciales.component';
import { DetailsGendarmesComponent } from './components/dgp-recrutement/gendarmes/details-gendarme/details-gendarme.component';

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        WebsiteModule,
        DgpRoutingModule,
        ReactiveFormsModule,
    ],
    exports: [],
    declarations: [
        DgpComponent,
        DgpDashboadComponent,
        DgpArchivesComponent,
        DgpAuxiliaireComponent,
        DgpRecrutementComponent,
        DgpReservisteComponent,
        ProfilComponent,
        GendarmesComponent,
        InfosGeneralesComponent,
        InfosGradesComponent,
        InfosProfessionnellesComponent,
        InfosSpecialesComponent,
        DetailsGendarmesComponent,
    ],
    providers: [
        DgpService,
        DgpGuard
    ],
})
export class DgpModule { }
