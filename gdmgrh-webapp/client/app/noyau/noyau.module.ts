import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { WebsiteModule } from '../website/website.module';

import { NoyauService } from './service/noyau.service';
import { SanctionService } from './service/sanction.service';
import { UniteService } from './service/unite.service';

import { NoyauRoutingModule } from './noyau.routing';

import { NoyauComponent } from './noyau.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { CreatedUsersComponent } from './components/user-manager/created-users/created-users.component';
import { CreatGroupComponent } from './components/user-manager/creat-group/creat-group.component';
import { ListUsersComponent } from './components/user-manager/list-users/list-users.component';
import { ListGroupComponent } from './components/user-manager/list-group/list-group.component';
import { UniteComponent } from './components/unite/unite.component';
import { SanctionComponent } from './components/sanction/sanction.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';
import { DiplomesComponent } from './components/diplomes/diplomes.component';
import { GradesComponent } from './components/grades/grades.component';
import { GlobalData } from './service/globaldata';
import { DiplomesService } from './service/diplomes.service';
import { GradesService } from './service/grades.service';
import { NoyauGuard } from './noyau.guard';
import { PunitionComponent } from './components/sanction/punition/punition.component';
import { RecompenseComponent } from './components/sanction/recompense/recompense.component';

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        WebsiteModule,
        NoyauRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        HttpClientModule
    ],
    declarations: [
        NoyauComponent,
        UserManagerComponent,
        CreatedUsersComponent,
        CreatGroupComponent,
        ListUsersComponent,
        ListGroupComponent,
        DiplomesComponent,
        GradesComponent,
        SanctionComponent,
        UniteComponent,
        DashboadComponent,
        PunitionComponent,
        RecompenseComponent
    ],
    providers: [
        NoyauService,
        SanctionService,
        UniteService,
        DiplomesService,
        GradesService,
        GlobalData,
        NoyauGuard
    ]
})

export class NoyauModule {

}
