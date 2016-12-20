import {beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http} from '@angular/http';
import {provide} from '@angular/core';
import {TestUtils} from '../../../../test/di-exports';
import {UserSvc} from '../user.service'
import {DecHttp} from '../../../utils/http';

let mockresponse = {
	hello: "Hello."
}

this.fixture = null;
this.instance = null;

describe('User service', () => {

	beforeEachProviders(() => [
		DecHttp,
		UserSvc,
		BaseRequestOptions,
		MockBackend,			
		TestUtils.provideMockHttpProvider()
	]);

	beforeEach(inject([MockBackend], TestUtils.createMockHttpResponse(mockresponse)));

	const injectSvc = function (cb) {
		return inject([UserSvc], (svc: UserSvc) => cb(svc));
	}

	it('initialises', injectSvc(svc => {
		expect(svc).not.toBeNull();
	}));

	/*it('async test', done =>{

		injectSvc(svc => {
			
		})();

	});*/

});