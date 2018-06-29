import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NoyauModule } from '../noyau/noyau.module';

import { DamComponent } from './dam.component';
import { DamRoutingModule } from './dam.routing';
import { DamGuard } from './dam.guard';
import { DamService } from './service/dam.service';
import { DamDashboadComponent } from './components/dam-dashboad/dam-dashboad.component';


@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        NoyauModule,
        DamRoutingModule
    ],
    exports: [],
    declarations: [
        DamComponent,
        DamDashboadComponent
    ],
    providers: [
        DamService,
        DamGuard
    ],
})
export class DamModule { }
