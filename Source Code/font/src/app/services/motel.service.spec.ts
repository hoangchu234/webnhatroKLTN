import { TestBed } from '@angular/core/testing';

import { MotelService } from './motel.service';

describe('MotelService', () => {
  let service: MotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
