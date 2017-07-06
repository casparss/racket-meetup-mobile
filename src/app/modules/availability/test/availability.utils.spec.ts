import { TestBed, inject } from '@angular/core/testing';
import { isEqual } from 'lodash';
import { AvailabilityUtils } from '../availability.utils';
import {
  availabilityFixture,
  availabilityFixture2,
  availabilityUnityFixture
} from './availability.fixture';

describe("Availability Utils", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityUtils]
    });
  });

  it('initialises', inject([AvailabilityUtils], availabilityUtils => {
    expect(availabilityUtils).not.toBeNull();
	}));

  it('generateUnityObject()', inject([AvailabilityUtils], ({ generateUnityObject }) => {
    let unityObj = generateUnityObject([
      availabilityFixture,
      availabilityFixture2
    ]);

    expect(isEqual(unityObj, availabilityUnityFixture)).toBe(true);
	}));

  it('addClassPropTransform()', inject([AvailabilityUtils], ({ addClassPropTransform }) => {
    let availWithAddedClassProp = addClassPropTransform(availabilityFixture);
    expect(availWithAddedClassProp.morning[0].class).toBe("default");
	}));

});
