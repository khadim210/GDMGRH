import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DccComponent } from './dcc.component';
import { DccService } from './service/dcc.service';
import { DccDashboadComponent } from './components/dcc-dashboad/dcc-dashboad.component';
import { DccRoutingModule } from './dcc.routing';
import { NoyauModule } from '../noyau/noyau.module';
import { DccGuard } from './dcc.guard';

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        NoyauModule,
        DccRoutingModule
    ],
    exports: [],
    declarations: [
        DccComponent,
        DccDashboadComponent
    ],
    providers: [
        DccService,
        DccGuard
    ],
})
export class DccModule { }
