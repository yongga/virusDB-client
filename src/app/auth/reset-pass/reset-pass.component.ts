import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  emailSent: string = null;

  constructor(
    public auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  resetPass(form) {
    const target_email = form.value.email;
    if (target_email)
      this.auth.sendPasswordResetEmail(target_email)
          .then(() => {
            this.emailSent = `The password reset link has been sent to the email address provided.`;
            setTimeout(() => this.router.navigateByUrl('/login'), 3000);
          })
          .catch((err) => {
            console.error(`${err.message}`);
          });
  }

}
