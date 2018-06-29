import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NoyauModule } from '../noyau/noyau.module';
import { DifComponent } from './dif.component';
import { DifDashboadComponent } from './components/dif-dashboad/dif-dashboad.component';
import { DifGuard } from './dif.guard';
import { DifRoutingModule } from './dif.routing';

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        NoyauModule,
        DifRoutingModule
    ],
    exports: [],
    declarations: [
        DifComponent,
        DifDashboadComponent
    ],
    providers: [
        DifGuard
    ],
})
export class DifModule { }
