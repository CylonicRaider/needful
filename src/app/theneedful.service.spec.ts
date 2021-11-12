import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TheneedfulService } from './theneedful.service';

describe('TheneedfulService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: TheneedfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TheneedfulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('API interaction', () => {
    function processRequest(
      cb: ((ok: unknown) => void) | null,
      validate: ((request: TestRequest) => void) | null,
    ) {
      service.doTheNeedful(cb);
      const request = httpTestingController.expectOne('api/doit');
      if (validate) validate(request);
      expect(request.request.method).toEqual('POST');
      request.flush({ status: 'OK' });
      httpTestingController.verify();
    }

    it('should access the API', () => {
      processRequest(null, request => {
        expect(request.request.method).toEqual('POST');
      });
    });

    it('should invoke the callback', (done: () => void) => {
      const cb = jasmine.createSpy('callback');
      cb.and.callFake((ok: unknown) => {
        expect(ok).toBeDefined();
        done();
      });
      processRequest(cb, null);
    });
  });
});
