import { TestBed } from '@angular/core/testing';

import { AreaSearchService } from './area-search.service';

describe('AreaSearchService', () => {
  let service: AreaSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
