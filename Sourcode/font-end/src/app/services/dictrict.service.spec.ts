import { TestBed } from '@angular/core/testing';

import { DictrictService } from './dictrict.service';

describe('DictrictService', () => {
  let service: DictrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictrictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
