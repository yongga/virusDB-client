import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';

import { DialogService } from '../../services/dialog-service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_success_title: string = `Login Successful`;
  login_success_msg: string = `Redirecting to landing page...`;

  loginErr: string;

  constructor(
    public auth: AngularFireAuth,
    private route: Router,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.loginErr = null;
  }

  login(form) {
    const email = form.value.email;
    const pw = form.value.pw;

    // Get ref of saving dialog 
    // use it later to display one dialog at a time
    let ref = this.dialogService.displayLoggingIn();

    this.auth.signInWithEmailAndPassword(email, pw)
      .then((user) => {
        if (user) {
          setTimeout(() => {
            ref.close();
          }, 100);
          ref.afterClosed().subscribe(() => this.route.navigateByUrl('/viruses'));
          return user;
        }
      })
      .catch((err) => {
        this.loginErr = `${err}`;
        setTimeout(() => {
          ref.close();
        }, 100);
        ref.afterClosed().subscribe(() => {
          this.dialogService.displayLoginError();
        });
      })
  }
}
