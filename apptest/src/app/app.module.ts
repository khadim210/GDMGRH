import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DiplomeComponent } from './components/diplome/diplome.component';
import { DiplomeService} from './services/diplome.service';
import { AccueilComponent } from './components/accueil/accueil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddformComponent } from './components/addform/addform.component';
import { EditformComponent } from './components/editform/editform.component';
import { GradesComponent } from './components/grades/grades.component';
import { GradesService } from './services/grades.service';
import { AddgradeformComponent } from './components/addgradeform/addgradeform.component';

@NgModule({
  	declarations: [
    	AppComponent,
    	DiplomeComponent,
    	AccueilComponent,
    	AddformComponent,
    	EditformComponent,
    	GradesComponent,
    	AddgradeformComponent,
  	],
  	imports: [
    	BrowserModule,
    	AppRoutingModule,
    	HttpModule,
	    HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
	    BrowserAnimationsModule,
      MatDialogModule,
      MatFormFieldModule,
  	],
  	providers: [
  		DiplomeService,
      GradesService,
  	],
    entryComponents: [
      AddformComponent,
      EditformComponent,
      AddgradeformComponent,
    ],
  	bootstrap: [AppComponent]
})
export class AppModule { }
