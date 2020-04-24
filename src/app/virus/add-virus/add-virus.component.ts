import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { VirusesService } from 'src/app/services/viruses.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-add-virus',
  templateUrl: './add-virus.component.html',
  styleUrls: ['./add-virus.component.css']
})
export class AddVirusComponent implements OnInit {

  entryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private virusService: VirusesService,
  ) { }

  ngOnInit() {
    this.entryForm = this.formBuilder.group({
      species_name: '',
      entries: this.formBuilder.array([this.createItem()])
    });
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
    const controls = this.entryForm.get('entries') as FormArray;
    controls.push(this.createItem());
    console.log(controls);
  }

  removeItem(i): void {
    const controls = this.entryForm.get('entries') as FormArray;
    controls.removeAt(i);
    console.log(controls);
  }

  get entryFormGroups() {
    return (<FormArray>this.entryForm.get('entries')).controls;
  }

  onSubmit() {
    this.virusService.addVirus(this.entryForm).subscribe(
      resp => {
        console.log(`Response = `, resp);
      }
    )
  }

}
