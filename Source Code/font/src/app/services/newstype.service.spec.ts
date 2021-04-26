import { TestBed } from '@angular/core/testing';

import { TypeofnewService } from './newstype.service';

describe('TypeofnewService', () => {
  let service: TypeofnewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeofnewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
