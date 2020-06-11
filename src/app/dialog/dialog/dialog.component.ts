import {Component, OnInit, Inject, Input, EventEmitter, Output} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog-service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {}, 
    private dialogRef: MatDialogRef<DialogComponent>,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  leavePage() {
    this.dialogService.onExit.emit();
  }

}