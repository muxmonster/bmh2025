import { TestBed } from '@angular/core/testing';

import { ProvideridService } from './providerid.service';

describe('ProvideridService', () => {
  let service: ProvideridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvideridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
