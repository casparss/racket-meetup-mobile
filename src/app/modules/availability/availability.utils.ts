import { Injectable } from '@angular/core';
import { mapValues, map } from 'lodash';
import { SELECTED_CLASS } from './class-constants';

@Injectable()
export class AvailabilityUtils {
  generateUnityObject([avail1, avail2]){
    let isTrue = v => v === true;
    let returnObj = bool => ({ v: bool });

    let mapFunc = key =>
      ({v}, i) => returnObj( isTrue(v) && isTrue(avail2[key][i].v) );

    let mapOn = key => avail1[key].map(mapFunc(key));

    return {
      morning: mapOn("morning"),
      afternoon: mapOn("afternoon"),
      evening: mapOn("evening")
    };
  }

  mapPeriods({ morning, afternoon, evening }) {
    return { morning, afternoon, evening }
  }

  addClassPropTransform(periods) {
    return mapValues(periods, period =>
      period.map(value => ({ value, class: SELECTED_CLASS}))
    )
  }

  mapForTransport(model) {
    return mapValues(model, period => period.map(({ value }) => value))
  }
}
