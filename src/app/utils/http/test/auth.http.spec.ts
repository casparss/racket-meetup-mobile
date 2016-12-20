import {beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http, Headers} from '@angular/http';
import {Injectable, provide} from '@angular/core';
import {TestUtils} from '../../../../test/di-exports';
import {AuthHttp} from '../';


@Injectable()
class HttpMock extends AuthHttp {

	constructor(http: Http){
		super(http);
	}

	get(url, opts){
		return this._get(url, opts);
	}
	post(url, data, opts){
		return this._post(url, data, opts);
	}
	put(url, data, opts){
		return this._put(url, data, opts);
	}
	delete(url, opts){
		return this._get(url, opts);
	}

};

describe('Auth HTTP', () => {

	beforeEachProviders(() => [
		Http,
		HttpMock,		
		BaseRequestOptions,
		MockBackend,	
		TestUtils.provideMockHttpProvider()
	]);

	beforeEach(inject([MockBackend], TestUtils.createMockHttpResponse({hi: "hi"})));

	const injectSvc = function (cb) {
		return inject([HttpMock], (svc: HttpMock) => {
			cb(svc);
		});
	}

	it('initialises', injectSvc(svc => {
		expect(svc).not.toBeNull();
	}));

	//@TODO:10 an improvement to the test would be to check the
	//request headers on the mock back end and cover every method

	it('get(): expect token to have been set to headers object.', done =>{

		let mockOpts = {
			headers: new Headers()
		}

		let token = "12345";
		let headerKey = 'x-auth';

		injectSvc(svc => {

			svc.token = token;
			spyOn(mockOpts.headers, 'append');
			svc.get('/url', mockOpts);
			expect(mockOpts.headers.append).toHaveBeenCalled();
			expect(mockOpts.headers.append).toHaveBeenCalledWith(headerKey, token);
			done()

		})();

	});

});