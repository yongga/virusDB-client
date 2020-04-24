import { TestBed } from '@angular/core/testing';

import { VirusesService } from './viruses.service';

describe('VirusesService', () => {
  let service: VirusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
