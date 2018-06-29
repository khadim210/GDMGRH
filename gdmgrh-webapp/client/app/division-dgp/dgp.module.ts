import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NoyauModule } from '../noyau/noyau.module';

import { DgpComponent } from './dgp.component';
import { DgpDashboadComponent } from './components/dgp-dashboad/dgp-dashboad.component';
import { DgpGuard } from './dgp.guard';
import { DgpRoutingModule } from './dgp.routing';

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        NoyauModule,
        DgpRoutingModule
    ],
    exports: [],
    declarations: [
        DgpComponent,
        DgpDashboadComponent
    ],
    providers: [
        DgpGuard
    ],
})
export class DgpModule { }
