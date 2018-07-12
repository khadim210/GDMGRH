import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GeneralModule } from './general/general.module';
import { NoyauModule } from './noyau/noyau.module';
import { WebsiteModule } from './website/website.module';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { AppInterceptor } from './app.interceptor';
import { DamModule } from './division-dam/dam.module';
import { DccModule } from './division-dcc/dcc.module';
import { DgpModule } from './division-dgp/dgp.module';
import { DifModule } from './division-dif/dif.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        GeneralModule,
        NoyauModule,
        DamModule,
        DccModule,
        DgpModule,
        DifModule,
        WebsiteModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
