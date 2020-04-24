import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddVirusComponent } from './virus/add-virus/add-virus.component';
import { VirusListComponent } from './virus/virus-list/virus-list.component';


const routes: Routes = [
  
  // { path: '', component: AppComponent },
  { path: 'add-virus', component: AddVirusComponent },
  { path: 'viruses', component: VirusListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
