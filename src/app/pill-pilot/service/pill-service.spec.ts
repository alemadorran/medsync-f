import { TestBed } from '@angular/core/testing';

import { PillService } from './pill-service';

describe('PillService', () => {
  let service: PillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
