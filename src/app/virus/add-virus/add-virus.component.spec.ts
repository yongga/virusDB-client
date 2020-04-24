import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVirusComponent } from './add-virus.component';

describe('AddVirusComponent', () => {
  let component: AddVirusComponent;
  let fixture: ComponentFixture<AddVirusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVirusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVirusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
