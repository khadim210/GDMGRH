import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DiplomeComponent } from './components/diplome/diplome.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { GradesComponent } from './components/grades/grades.component';


const routes: Routes = [
	{ path: 'diplome', component: DiplomeComponent },
	{ path: '', component: AccueilComponent},
	{ path: 'grade', component: GradesComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
