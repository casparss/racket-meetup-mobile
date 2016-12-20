import {beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http} from '@angular/http';
import {provide} from '@angular/core';
import {TestUtils} from '../../../../test/di-exports';
import {ColObjDifferFactory} from '../../../utils/differs/collection-object-diff.ts';
import {ColObjDifferFactoryMock, CollectionObjectDifferMock} from './availability.mocks.ts';
import {AvailabilitySvc} from '../availability.service.ts';
import {model} from './availability.fixture.ts';
import {DecHttp} from '../../../utils/http/';

this.fixture = null;
this.instance = null;

describe('Availability service', () => {

	beforeEachProviders(() => [
		DecHttp,
		AvailabilitySvc,
		BaseRequestOptions,
		MockBackend,
		provide(ColObjDifferFactory, {useClass: ColObjDifferFactoryMock}),		
		TestUtils.provideMockHttpProvider()
	]);

	beforeEach(inject([MockBackend], TestUtils.createMockHttpResponse(model)));

	const injectSvc = function (cb) {
		return inject([AvailabilitySvc], (svc: AvailabilitySvc) => {
			cb(svc);
		});
	}

	it('initialises', injectSvc(svc => {
		expect(svc).not.toBeNull();
	}));

	it('get() sets [\'differ\'] property as instanceOf CollectionObjectDifferMock', done =>{

		injectSvc(svc => {
			svc.get().subscribe(
				()=>{
					expect(svc.differ).toEqual(jasmine.any(CollectionObjectDifferMock));
					done();
				}
			);
		})();

	});

});