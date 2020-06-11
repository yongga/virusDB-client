import { Component, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { VirusesService } from 'src/app/services/viruses.service';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog-service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';

@Component({
  selector: 'app-add-virus',
  templateUrl: './add-virus.component.html',
  styleUrls: ['./add-virus.component.css']
})
export class AddVirusComponent {

  constructor(
    private virusService: VirusesService,
    private router: Router,
    private dialogService: DialogService,
  ) {}

  cancel() {
    this.router.navigateByUrl('/viruses');
  }

  addVirus(data) {

    // Get ref of saving dialog 
    // use it later to display one dialog at a time
    let ref = this.dialogService.displaySaveDialog();

    this.virusService.addVirus(data).subscribe(
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
