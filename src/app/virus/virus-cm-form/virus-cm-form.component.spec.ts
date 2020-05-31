import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusCmFormComponent } from './virus-cm-form.component';

describe('VirusCmFormComponent', () => {
  let component: VirusCmFormComponent;
  let fixture: ComponentFixture<VirusCmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirusCmFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirusCmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
