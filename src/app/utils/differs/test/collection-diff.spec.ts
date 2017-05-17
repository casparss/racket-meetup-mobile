import { CollectionDiff } from '../collection-diff';
import { KeyValueDiffers, ChangeDetectorRef } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';

describe("Collection differ", () => {

  it('runs diff on unchanged obj and returns empty arr.', inject([KeyValueDiffers], keyValueDiffer => {

    let arr = [{ v: true }, { v: false }, { v: true }];
    let collectionDiff = new CollectionDiff(arr, keyValueDiffer);

    collectionDiff.diff().then((changedObj: Array<any>) => {
      expect(changedObj.length).toEqual(0);
    });

  }));

  it('runs diff on changed obj and returns a single changed diff.', inject([KeyValueDiffers], keyValueDiffer => {

    let arr = [{ v: true }, { v: false }, { v: true }];
    let collectionDiff = new CollectionDiff(arr, keyValueDiffer);

    collectionDiff.diff().then((changedObj: Array<any>) => {
      expect(changedObj.length).toEqual(0);
    });

    arr[0].v = false;

    collectionDiff.diff().then((changedObj: Array<any>) => {
      expect(changedObj.length).toEqual(1);
    });

  }));

    //Needs test for successful diff.

});
