import { async, TestBed, inject } from '@angular/core/testing';
import { Subject, Observable } from 'rxjs';
import { DecHttp } from '../../../utils/http/';
import { FacadeBaseService, DecHttpMock } from './base.service.mocks';

describe('Base service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FacadeBaseService,
        { provide: DecHttp, useClass: DecHttpMock }
      ]
    });
  });

  it('initialises', inject([FacadeBaseService], facadeBaseService => {
    expect(facadeBaseService).not.toBeNull();
  }));

  it('httpWrapper()', inject([FacadeBaseService, DecHttp], (facadeBaseService, http) => {
    spyOn(http, 'post').and.callThrough();
    spyOn(http, 'put').and.callThrough();
    facadeBaseService._sync();
    facadeBaseService._update();
    expect(http.post).toHaveBeenCalled();
    expect(http.put).toHaveBeenCalled();
  }));

  it('inflight subject recieves a true before, and false after, requests', inject([FacadeBaseService], facadeBaseService => {
    spyOn(facadeBaseService, 'isInFlight').and.callThrough();
    spyOn(facadeBaseService, 'notInflight').and.callThrough();
    facadeBaseService._get(null, {});
    expect(facadeBaseService.isInFlight).toHaveBeenCalled();
    expect(facadeBaseService.notInflight).toHaveBeenCalled();
  }));

  it('generateUrl()', inject([FacadeBaseService], facadeBaseService => {
    const baseUrl = facadeBaseService.baseUrl;
    const url = "url/";
    const params = "?hello=123"
    const generatedUrl = facadeBaseService.generateUrl(url, params);
    expect(generatedUrl).toBe(`${baseUrl}${url}${params}`);
  }));

  it('create$()', async(inject([FacadeBaseService], facadeBaseService => {
    const runExpectation = value => {
      expect(value).toEqual(mockValue);
    };

    const failTest = error => {
      //Could probably find a more precise way of doing this
      //perhaps doing an instanceof Error ?
      expect(error).toBeUndefined();
    };

    const mockValue = { some: "object" };
    const dave$ = facadeBaseService.create$('dave', mockValue);
    const subject = facadeBaseService.subjects['dave'];
    

    expect(subject instanceof Subject).toBe(true);

    dave$.subscribe(runExpectation, failTest);
    subject.next(mockValue);
  })));

});
