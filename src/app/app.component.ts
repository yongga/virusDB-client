import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VirusDB';

  username;
  password;
  showSpinner = true;

  login() : boolean {
    return true;
  }
}