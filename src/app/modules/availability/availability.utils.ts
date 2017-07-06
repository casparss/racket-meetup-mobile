import { Injectable } from '@angular/core';
import { mapValues } from 'lodash';

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

  addClassPropTransform(avail){
    const NORMAL_CLASS = 'normal';
    return mapValues(avail, period =>
      period.map(
        ({v}) => ({ v, class: NORMAL_CLASS})
      )
    );
  }
}
