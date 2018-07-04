import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { WebsiteModule } from '../website/website.module';

import { DccComponent } from './dcc.component';
import { DccService } from './service/dcc.service';
import { DccDashboadComponent } from './components/dcc-dashboad/dcc-dashboad.component';
import { DccRoutingModule } from './dcc.routing';
import { DccGuard } from './dcc.guard';

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        WebsiteModule,
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
