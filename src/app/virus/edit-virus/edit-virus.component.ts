import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { VirusesService } from 'src/app/services/viruses.service';
import { pipe } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog-service';

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
    private dialogService: DialogService,
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
    // Get ref of saving dialog 
    // use it later to display one dialog at a time
    let ref = this.dialogService.displaySaveDialog();

    this.virusService.updateVirus(data).subscribe(
      resp => {
        if (resp['success'] == true) {
          setTimeout(() => { 
            ref.close();
            this.router.navigateByUrl('/');
          }, 100);
        }
        else {
          ref.afterClosed().subscribe(() => {
            this.dialogService.displayErrorDialog();
          });
          ref.close();
        }
      }
    );
  }

}
