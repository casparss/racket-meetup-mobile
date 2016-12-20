import {beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http} from '@angular/http';
import {provide} from '@angular/core';
import {TestUtils} from '../../../../test/di-exports';
import {DecHttp, AuthHttp} from '../';


this.fixture = null;
this.instance = null;

class MockHttp{
	do(){ return this; }
	map(){ return this; }
	catch(){ return this; }
	cache(){ return this; }	
}

let mockResponse = {
	message: "Hello there!",
	data: {
		stuff: "Hello"
	}
};

describe('Decorated HTTP', () => {

	beforeEachProviders(() => [
		Http,
		DecHttp,
		AuthHttp,
		BaseRequestOptions,
		MockBackend,	
		TestUtils.provideMockHttpProvider()
	]);

	beforeEach(inject([MockBackend], TestUtils.createMockHttpResponse(mockResponse)));

	const injectSvc = function (cb) {
		return inject([DecHttp], (svc: DecHttp) => {
			cb(svc);
		});
	}

	it('initialises', injectSvc(svc => {
		expect(svc).not.toBeNull();
	}));

	it('extractData()', done =>{

		injectSvc(svc => {

			svc.get('/url')
				.subscribe(data => {
					expect(data).toEqual(mockResponse.data);
					done();
				});

		})();

	});

	it('checkMessage()', done => {

		injectSvc(svc => {

			svc.onMessage.subscribe((message) => {
				expect(message).toEqual(mockResponse.message);
				done();
			});

			svc.get('/url').subscribe(data => { console.log("Request"); });

		})();

	});

	it('get()', done => {

		let mockUrl = "/url";
		let mockOpts = { hello: "hello" };

		injectSvc(svc => {

			spyOn(svc, '_get').and.returnValue(new MockHttp);
			svc.get(mockUrl, mockOpts);

			expect(svc._get).toHaveBeenCalled();
			expect(svc._get).toHaveBeenCalledWith(mockUrl, mockOpts);

			done();

		})();

	});

	it('post()', done => {

		let mockUrl = "/url";
		let mockData = { hi: "hi"};
		let mockOpts = { hello: "hello" };

		injectSvc(svc => {

			spyOn(svc, '_post').and.returnValue(new MockHttp);
			svc.post(mockUrl, mockData, mockOpts);

			expect(svc._post).toHaveBeenCalled();
			expect(svc._post).toHaveBeenCalledWith(mockUrl, mockData, mockOpts);

			done();

		})();

	});

	it('put()', done => {

		let mockUrl = "/url";
		let mockData = { hi: "hi"};
		let mockOpts = { hello: "hello" };

		injectSvc(svc => {

			spyOn(svc, '_put').and.returnValue(new MockHttp);
			svc.put(mockUrl, mockData, mockOpts);

			expect(svc._put).toHaveBeenCalled();
			expect(svc._put).toHaveBeenCalledWith(mockUrl, mockData, mockOpts);

			done();

		})();

	});

	it('delete()', done => {

		let mockUrl = "/url";
		let mockOpts = { hello: "hello" };

		injectSvc(svc => {

			spyOn(svc, '_delete').and.returnValue(new MockHttp);
			svc.delete(mockUrl, mockOpts);

			expect(svc._delete).toHaveBeenCalled();
			expect(svc._delete).toHaveBeenCalledWith(mockUrl, mockOpts);

			done();

		})();

	});


});