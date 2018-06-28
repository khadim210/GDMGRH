import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { GeneralModule } from './module_general/general.module';
import { NoyauModule } from './module_noyau/noyau.module';
import { WebsiteModule } from './website/website.module';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
    providers: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        GeneralModule,
        NoyauModule,
        WebsiteModule,
        AppRoutingModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
