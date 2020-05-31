import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVirusComponent } from './edit-virus.component';

describe('EditVirusComponent', () => {
  let component: EditVirusComponent;
  let fixture: ComponentFixture<EditVirusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVirusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVirusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
