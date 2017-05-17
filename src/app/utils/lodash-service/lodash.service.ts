import { Injectable } from '@angular/core';
import lodash from 'lodash';

/**
 * LodashSvc
 * @description This allows lodash to be injectable and thus mockable in tests
 */
@Injectable()
export class LodashSvc {
  constructor(){
    Object.assign(this, lodash)
  }
}
