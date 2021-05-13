import { TestBed } from '@angular/core/testing';

import { PriceSearchService } from './price-search.service';

describe('PriceSearchService', () => {
  let service: PriceSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
