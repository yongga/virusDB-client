import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ** Ngx-Bootstrap Modules **
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

// ** Material Design Modules **
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    // AlertModule.forRoot(),
    // ButtonsModule.forRoot(),
    // MatToolbarModule,
    // MatSidenavModule,
    // MatListModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatIconModule,
  ],
  exports: [
  ]
})
export class SharedModule { }
