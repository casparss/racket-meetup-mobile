import { async, fakeAsync, TestBed, inject } from '@angular/core/testing';
import { AvailabilitySvc } from '../availability.service';
import { DecHttp } from '../../../utils/http/';
import { ColObjDifferFactory } from '../../../utils/differs/collection-object-diff';
import { ColObjDifferFactoryMock, DecHttpMock, differ } from './availability.mocks';

//Service unit testing example
//https://blog.thoughtram.io/angular/2016/11/28/testing-services-with-http-in-angular-2.html

describe("Availability Service", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AvailabilitySvc,
        { provide: DecHttp, useClass: DecHttpMock },
        { provide: ColObjDifferFactory, useClass: ColObjDifferFactoryMock}
      ]
    });
  });

  it('initialises', inject([AvailabilitySvc], availabilitySvc => {
    expect(availabilitySvc).not.toBeNull();
	}));

  it("diff()", inject([AvailabilitySvc], availabilitySvc => {
    availabilitySvc.differ = differ;
    spyOn(availabilitySvc, 'debouncedSync');
    availabilitySvc.diff();
    expect(availabilitySvc.debouncedSync).toHaveBeenCalled();
  }));

});
