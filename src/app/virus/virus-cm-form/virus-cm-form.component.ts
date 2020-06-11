import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { VirusesService } from '../../services/viruses.service';
import { DialogService } from 'src/app/services/dialog-service';

@Component({
  selector: 'app-virus-cm-form',
  templateUrl: './virus-cm-form.component.html',
  styleUrls: ['./virus-cm-form.component.css']
})

// User Interface component for insert / edit virus form

export class VirusCmFormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formData; // for edit form
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    // for new form
    if (!this.formData) {
      this.formGroup = this.formBuilder.group({
        species_name: '',
        entries: this.formBuilder.array([this.createItem()]),
      }); 
    } 
    // for edit form
    else {
      this.formGroup = this.formBuilder.group({
        species_name: `${this.formData['species_name']}`,
        entries: this.formBuilder.array([]),
      });

      let discoveries = this.formData['discoveries'];
      discoveries.forEach(() => this.addItem());
      this.formGroup.patchValue({
        'entries': discoveries,
      });
    }

  }

  // Create this nested form group whenever a new discovery is added
  createItem(): FormGroup {
    return this.formBuilder.group({
      country: '',
      date_found: '',
      citation: this.formBuilder.group({
        author: '',
        pub_year: '',
      })
    });
  }

  addItem(): void {
    const controls = this.formGroup.get('entries') as FormArray;
    controls.push(this.createItem());
  }

  removeItem(i): void {
    const controls = this.formGroup.get('entries') as FormArray;
    controls.removeAt(i);
  }

  get entryFormGroups() {
    return (<FormArray>this.formGroup.get('entries')).controls;
  }

  // Emit a cancel event
  cancel() {
    // Only show confirmation dialog if form has been touched
    if (this.formGroup.dirty === true) {
      this.dialogService.displayLeavePageDialog();
      this.dialogService.onExit.subscribe((evt: DialogService) => {
        this.onCancel.emit();
      });
    }
    else 
      this.onCancel.emit();
  }

  // Emit a submit event
  submit() {
    let recordData = this.formGroup.value;
    recordData["_id"] = this.formData ? this.formData['_id'] : '';
    this.onSubmit.emit(recordData);
  }

}
