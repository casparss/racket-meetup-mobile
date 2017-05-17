import { async, fakeAsync, TestBed, inject } from '@angular/core/testing';
import { LodashSvc } from '../lodash.service';

describe("Lodash Service", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LodashSvc
      ]
    });
  });

  it('initialises', inject([LodashSvc], lodashSvc => {
    expect(lodashSvc).not.toBeNull();
	}));

  it('has some lodash methods', inject([LodashSvc], lodashSvc => {
    expect(lodashSvc.map).not.toBeNull();
    expect(lodashSvc.filter).not.toBeNull();
    expect(lodashSvc.find).not.toBeNull();
    expect(lodashSvc.reduce).not.toBeNull();
    expect(lodashSvc.debounce).not.toBeNull();
	}));

});
