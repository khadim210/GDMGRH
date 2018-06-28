import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NoyauService } from './service/noyau.service';

import { NoyauRoutingModule } from './noyau.routing';

import { NoyauComponent } from './noyau.component';
import { CompteUserComponent } from './components/account_manager/compte-user/compte-user.component';
import { CreatedUsersComponent } from './components/account_manager/compte-user/created-users/created-users.component';
import { CreatGroupComponent } from './components/account_manager/compte-user/creat-group/creat-group.component';
import { ListUsersComponent } from './components/account_manager/compte-user/list-users/list-users.component';
import { ListGroupComponent } from './components/account_manager/compte-user/list-group/list-group.component';
import { SigninComponent } from './components/account_manager/signin/signin.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { UniteComponent } from './components/unite/unite.component';
import { DiplomesComponent } from './components/diplomes/diplomes.component';
import { GradesComponent } from './components/grades/grades.component';
import { SanctionComponent } from './components/sanction/sanction.component';
import { SanctionService } from './service/sanction.service';
import { UniteService } from './service/unite.service';
import { DiplomesService } from './service/diplomes.service';
import { GradesService } from './service/grades.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NoyauRoutingModule,
        ReactiveFormsModule,
        NgbModule,
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        CompteUserComponent
    ],
    declarations: [
        NoyauComponent,
        CompteUserComponent,
        CreatedUsersComponent,
        CreatGroupComponent,
        ListUsersComponent,
        ListGroupComponent,
        SigninComponent,
        FooterComponent,
        HeaderComponent,
        NavbarComponent,
        SanctionComponent,
        UniteComponent,
        DiplomesComponent,
        GradesComponent,
    ],
    providers: [
        NoyauService,
        SanctionService,
        UniteService,
        DiplomesService,
        GradesService
    ]
})

export class NoyauModule {

}
