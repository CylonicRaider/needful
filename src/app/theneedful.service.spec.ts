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

  describe('doing the needful', () => {
    beforeEach(() => jasmine.clock().install());
    afterEach(() => jasmine.clock().uninstall());

    it('should invoke the callback', done => {
      const cb = jasmine.createSpy('callback');
      cb.and.callFake((ok: unknown) => {
        expect(ok).toBeDefined();
        done();
      });
      service.doTheNeedful(cb);
      expect(cb).not.toHaveBeenCalled();
      jasmine.clock().tick(5000);
    });
  });
});
