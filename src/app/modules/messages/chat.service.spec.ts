/*import {beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http} from '@angular/http';
import {provide} from '@angular/core';
import {TestUtils} from '../../../test/diExports';
import {ColObjDifferFactory} from '../../utils/differs/collection-object-diff';
import {ColObjDifferFactoryMock, CollectionObjectDifferMock} from './availability.mocks';
import {AvailabilityService} from './availability.service';
import {model} from './availability.fixture';

this.fixture = null;
this.instance = null;

describe('Availability service', () => {

	beforeEachProviders(() => [
		AvailabilityService,
		BaseRequestOptions,
		MockBackend,
		provide(ColObjDifferFactory, {useClass: ColObjDifferFactoryMock}),		
		TestUtils.provideMockHttpProvider()
	]);

	beforeEach(inject([MockBackend], TestUtils.createMockHttpResponse(model)));

	const injectSvc = function (cb) {
		return inject([AvailabilityService], (svc: AvailabilityService) => {
			cb(svc);
		});
	}

	it('initialises', injectSvc(svc => {
		expect(svc).not.toBeNull();
	}));

	it('get() sets [\'differ\'] property as instanceOf CollectionObjectDifferMock', done =>{

		injectSvc(svc => {
			svc.get().then(()=>{
				expect(svc.differ).toEqual(jasmine.any(CollectionObjectDifferMock));
				done();
			});
		})();

	});

});*/