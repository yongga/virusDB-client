import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { VirusesService } from 'src/app/services/viruses.service';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-virus',
  templateUrl: './add-virus.component.html',
  styleUrls: ['./add-virus.component.css']
})
export class AddVirusComponent {

  constructor(
    private formBuilder: FormBuilder,
    private virusService: VirusesService,
    private router: Router,
  ) { }

  cancel() {
    this.router.navigateByUrl("/viruses");
  }

  addVirus(data) {
    this.virusService.addVirus(data).subscribe(
      resp => {
        if (resp['success'] == true)
          console.log(`Response = `, resp);
        this.router.navigateByUrl('/');
      }
    );
    //console.log(`Insert data`, data);
  }

}
