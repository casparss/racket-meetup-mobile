import { async, TestBed, inject } from '@angular/core/testing';
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
      console.log("What the fuck?");
  }));

  it('generateUrl()', inject([FacadeBaseService], facadeBaseService => {

  }));

  it('create$()', inject([FacadeBaseService], facadeBaseService => {

  }));

  it('params()', inject([FacadeBaseService], facadeBaseService => {

  }));

});
