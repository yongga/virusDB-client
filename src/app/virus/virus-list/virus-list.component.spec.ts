import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusListComponent } from './virus-list.component';

describe('VirusListComponent', () => {
  let component: VirusListComponent;
  let fixture: ComponentFixture<VirusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
