import {beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {provide, KeyValueDiffers} from '@angular/core';
import {TestUtils} from '../../../../test/di-exports';
import {CollectionDiff} from '../collection-diff';

this.kvd = null;

describe('Collection differ.', () => {

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

	//@#Bug:0 The keyvalue differ doesn't register any changes
	//whilst in test scenario. Need to investigate

	/*it('Run diff on changed obj triggers resolve on returned promise.', done => {

		let arr = [{ v: true }, { v: false }, { v: true }];		
		let collectionDiff = new CollectionDiff(arr, this.kvd);

		arr[0].v = false;

		collectionDiff.diff()
			.then(
				(changedMap:Array<any>) => {
					console.log(changedMap);
					expect(changedMap.length).toEqual(1);
					done();
			},
				(err) => {
					expect(err).not.toEqual(err);
					done();
				});

	});*/

	it('Running diff on unchanged obj triggers reject on returned promise.', done => {

		let arr = [{ v: true }, { v: false }, { v: true }];
		let collectionDiff = new CollectionDiff(arr, this.kvd);

		collectionDiff.diff()
			.then(
				changedObj => {
					done();
					expect(changedObj).not.toEqual(changedObj);
			},
				err => {
					expect(err.message).toEqual("No changes!");
					done();
				});

	});


});