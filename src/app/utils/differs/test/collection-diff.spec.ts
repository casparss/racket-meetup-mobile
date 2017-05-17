import { CollectionDiff } from '../collection-diff';
import { KeyValueDiffers, ChangeDetectorRef } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';

describe("Collection differ", () => {

  it('runs diff on unchanged obj and returns empty arr.', inject([KeyValueDiffers], keyValueDiffer => {

    let arr = [{ v: true }, { v: false }, { v: true }];
    let collectionDiff = new CollectionDiff(arr, keyValueDiffer);

    collectionDiff.diff()
    .then(
      (changedObj: Array<any>) => {
        expect(changedObj.length).toEqual(0);
      });

    }));

    //Needs test for successful diff.

});
