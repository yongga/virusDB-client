import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddVirusComponent } from './virus/add-virus/add-virus.component';
import { EditVirusComponent } from './virus/edit-virus/edit-virus.component';
import { VirusListComponent } from './virus/virus-list/virus-list.component';
import { APIResolverService } from './services/apiresolver.service';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuthGuard, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ResetPassComponent } from './auth/reset-pass/reset-pass.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  
  { path: 'login', component: LoginComponent, },
  { path: 'reset-pass', component: ResetPassComponent },
  { path: 'add-virus', component: AddVirusComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'edit-virus/:id', component: EditVirusComponent, ...canActivate(redirectUnauthorizedToLogin), resolve:{ virus: APIResolverService } },
  { path: 'viruses', component: VirusListComponent, resolve:{ viruses: APIResolverService } },
  { path: '', redirectTo: '/viruses', pathMatch: 'full' },
  { path: '**', redirectTo: '/viruses' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
