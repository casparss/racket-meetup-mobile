import {beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http} from '@angular/http';
import {provide} from '@angular/core';
import {customAsyncInject, TestUtils} from '../../../../test/di-exports';
import {BaseService} from '../base.service';
import {ChildServiceMock} from './base.mock';
import {DecHttp} from '../../../utils/http/';
import {Observable, Subject} from 'rxjs';
import {customMatchers} from '../../../../test/custom-jasmine-matchers';

this.fixture = null;
this.instance = null;


let mockData = {
	fixture: "I am a fixture"		
}

let fixture = {
	data: mockData
};

describe('Base service', () => {

	beforeEachProviders(() => [
		DecHttp,
		ChildServiceMock,
		BaseRequestOptions,
		MockBackend,
		TestUtils.provideMockHttpProvider()
	]);

	beforeEach(() => {
		jasmine.addMatchers(customMatchers);	
	});

	beforeEach(inject([MockBackend], TestUtils.createMockHttpResponse(fixture)));

	

	it('Initialises', inject([ChildServiceMock], (svc: ChildServiceMock) => {
		expect(svc).not.toBeNull();
	}));

	it('Get() with specified observable name pushes test data back through to that observable.', inject([ChildServiceMock], (svc: ChildServiceMock) => {

		const testPropertyName: string = 'mock';

		svc.mock$.subscribe(
				data => {
					expect(data).toEqual(mockData);
					expect(svc[testPropertyName]).toEqual(mockData);
				}
			);

			svc._get(testPropertyName);

	}));

	it('createObservable() returns observable.', inject([ChildServiceMock], (svc: ChildServiceMock) => {
		let test$ = svc.createObservable("test");
		expect(test$).toBeInstanceOf(Observable);
	}));

	it('createObservable() creates corresponding subject to push to.', inject([ChildServiceMock], (svc: ChildServiceMock) => {
		const observableName = "test";
		let test$ = svc.createObservable(observableName);
		expect(svc.subjects[observableName]).toBeInstanceOf(Subject);
	}));

	it('_getById() passes params correctly', inject([ChildServiceMock], (svc: ChildServiceMock) => {
		//@#Refactor:30 Pretty pointless test. Really rather want to test the returned
		//check mock back end for search query params
		spyOn(svc, '_get');
		svc._get(null, "1");
		expect(svc._get).toHaveBeenCalled();
		expect(svc._get).toHaveBeenCalledWith(null, "1");		
	}));

	it('inFlightEvt emits correctly when calling _sync()', inject([ChildServiceMock], (svc: ChildServiceMock) => {

		spyOn(svc.inFlightEvt, 'emit');
		svc._sync(null, {});

		expect(svc.inFlightEvt.emit).toHaveBeenCalled();
		expect(svc.inFlightEvt.emit).toHaveBeenCalledWith(true);
		expect(svc.inFlightEvt.emit).toHaveBeenCalledWith(false);


	}));

});