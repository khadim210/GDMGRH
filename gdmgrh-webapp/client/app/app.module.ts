import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GeneralModule } from './module_general/general.module';
import { NoyauModule } from './module_noyau/noyau.module';
import { WebsiteModule } from './website/website.module';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { AppInterceptor } from './app.interceptor';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        GeneralModule,
        NoyauModule,
        WebsiteModule,
        AppRoutingModule,
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
