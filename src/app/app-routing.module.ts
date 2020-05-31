import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddVirusComponent } from './virus/add-virus/add-virus.component';
import { EditVirusComponent } from './virus/edit-virus/edit-virus.component';
import { VirusListComponent } from './virus/virus-list/virus-list.component';
import { APIResolverService } from './services/apiresolver.service';


const routes: Routes = [
  
  // { path: '', component: AppComponent },
  { path: 'add-virus', component: AddVirusComponent },
  { path: 'edit-virus/:id', component: EditVirusComponent, resolve:{ virus: APIResolverService } },
  { path: 'viruses', component: VirusListComponent, resolve:{ viruses: APIResolverService } },
  { path: '', redirectTo: '/viruses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
