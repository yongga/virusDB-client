import { Injectable, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogRef: MatDialogRef<DialogComponent>;

  public onExit: EventEmitter<DialogService> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    //private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  // display logging in dialog
  displayRetrievingData(): MatDialogRef<DialogComponent> {
    const dialogContent = {
      "title": ``,
      "msg": `Shhhh... Plundering data from the server...`,
    }
    return this.open(dialogContent);
  }

  // display logging in dialog
  displayLoggingIn(): MatDialogRef<DialogComponent> {
    const dialogContent = {
      "title": ``,
      "msg": `Logging in...`,
    }
    return this.open(dialogContent);
  }

  // display logging in dialog
  displayLoginError(): MatDialogRef<DialogComponent> {
    const dialogContent = {
      "title": `Login Error`,
      "err": `Invalid Credentials`,
    }
    return this.open(dialogContent);
  }

  // display leave page
  displayLeavePageDialog(): any {
    const dialogContent = {
      "title": `Leave Page Confirmation`,
      "msg": `Confirm leave page? Changes will not be saved.`,
      "type": `actionable`,
    }
    return this.open(dialogContent);
  }

  displaySaveDialog(): MatDialogRef<DialogComponent> {
    const dialogContent = {
      "title": ``,
      "msg": `Saving data...`,
    }
    return this.open(dialogContent);
  }

  displayErrorDialog(): MatDialogRef<DialogComponent> {
    const dialogContent = {
      "title": `Error`,
      "err": `An error has occurred while saving data.`,
    }
    return this.open(dialogContent);
  }

  open(params): MatDialogRef<DialogComponent> {
    this.dialogRef = this.dialog.open(
      DialogComponent, {
        data: {
            "title": params.title ? `${params.title}` : null,
            "msg": params.msg ? `${params.msg}` : null,
            "err": params.err ? `${params.err}` : null,
            "type": params.type ? `${params.type}` : null,
        }
      });
      return this.dialogRef;
  }

  close() {
    this.dialogRef.close();
  }
}
