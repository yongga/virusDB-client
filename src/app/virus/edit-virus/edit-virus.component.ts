import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { VirusesService } from 'src/app/services/viruses.service';
import { pipe } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-virus',
  templateUrl: './edit-virus.component.html',
  styleUrls: ['./edit-virus.component.css']
})
export class EditVirusComponent implements OnInit {
  entryData;

  constructor(
    private formBuilder: FormBuilder,
    private virusService: VirusesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { virus: any }) => {
      this.entryData = data.virus[0];
    });
  }

  cancel() {
    this.router.navigateByUrl("/viruses");
  }

  // Update the species record
  updateVirus(data) {
    this.virusService.updateVirus(data).subscribe(
      resp => {
        if (resp['success'] == true)
          console.log(`Response = `, resp);
        this.router.navigateByUrl('/');
      }
    );
    //console.log(`Update data`, data);
  }

}
