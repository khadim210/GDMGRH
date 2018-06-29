import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NoyauModule } from '../noyau/noyau.module';
import { GeneralService } from './service/general.service';
import { GeneralComponent } from './general.component';
import { GeneralDashboadComponent } from './components/general-dashboad/general-dashboad.component';
import { GeneralGuard } from './general.guard';
import { GeneralRoutingModule } from './general.routing';

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        NoyauModule,
        GeneralRoutingModule
    ],
    exports: [],
    declarations: [
        GeneralComponent,
        GeneralDashboadComponent
    ],
    providers: [
        GeneralService,
        GeneralGuard
    ],
})
export class GeneralModule { }
