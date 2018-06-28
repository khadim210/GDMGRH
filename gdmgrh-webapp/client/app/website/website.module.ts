import { NgModule } from '@angular/core';

import { NotFoundComponent } from './components/404/404.component';
import { NoyauModule } from '../noyau/noyau.module';

@NgModule({
    imports: [
        NoyauModule
    ],
    exports: [
        NotFoundComponent
    ],
    declarations: [
        NotFoundComponent
    ]
})

export class WebsiteModule {

}
