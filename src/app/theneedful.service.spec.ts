import { TestBed } from '@angular/core/testing';

import { TheneedfulService } from './theneedful.service';

describe('TheneedfulService', () => {
  let service: TheneedfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheneedfulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
