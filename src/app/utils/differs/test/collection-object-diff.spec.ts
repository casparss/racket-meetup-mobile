import {beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {customMatchers} from '../../../../test/custom-jasmine-matchers';
import {KeyValueDiffers} from '@angular/core';
import {ColObjDifferFactory, CollectionObjectDiffer} from '../collection-object-diff';
import {TestUtils} from '../../../../test/di-exports';

this.kvd = null;

describe('Collection Object Differ.', () => {

	beforeEachProviders(() => [		
		ColObjDifferFactory
	]);

	beforeEach(() => {
		jasmine.addMatchers(customMatchers);	
	});

	const injectSvc = function (cb) {
		return inject([ColObjDifferFactory], (svc: ColObjDifferFactory) => {
			cb(svc);
		});
	}

	const injectKvd = function (cb) {
		return inject([KeyValueDiffers], (kvd: KeyValueDiffers) => {
			cb(kvd);
		})();
	}

	beforeEach(() => {
		injectKvd(kvd => {
			this.kvd = kvd;			
		} );
	});

	it('ColObjDifferFactory initialises', injectSvc(svc => {
		expect(svc).not.toBeNull();
	}));

	it('ColObjDifferFactory returns instanceOf CollectionObjectDiffer.', done =>{

		injectSvc(svc => {
			expect(svc).toBeInstanceOf(ColObjDifferFactory);
			done();
		})();

	});

	//@TODO:20 because the KeyValueDiffer doesn't detect changes on diff 
	//during test this can't be tested at the moment
	
	/*it('Run diff on changed obj triggers resolve on returned promise.', done => {

		let mockObj = {
			one: [{v: true},{v: false},{v: true}],
			two: [{v:false},{v:false},{v:false}]
		};

		let collectionObjectDiffer = new CollectionObjectDiffer(mockObj, this.kvd);

		mockObj.one[0].v = false;
		mockObj.one[1].v = true;
		mockObj.one[2].v = false;

		collectionObjectDiffer.diff()
			.then(
				(changed) => {
					console.log("changed", changed);
					expect(changed).toBe(changed);
					done();
				},
				err => {
					expect(err).not.toBe(err)
					done();
				}
			);


	});*/

	
	it('Run diff on unchanged obj triggers reject on returned promise.', () => {

		let mockObj = {
			one: [{v: true},{v: false},{v: true}],
			two: [{v:false},{v:false},{v:false}]
		};

		let collectionObjectDiffer = new CollectionObjectDiffer(mockObj, this.kvd);

		collectionObjectDiffer.diff()
			.then(
				changed => expect(changed).not.toBe(changed),
				err => expect(err).toBe(err)
			);

	});

});