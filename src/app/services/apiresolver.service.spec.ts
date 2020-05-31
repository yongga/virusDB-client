import { TestBed } from '@angular/core/testing';

import { APIResolverService } from './apiresolver.service';

describe('APIResolverService', () => {
  let service: APIResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
