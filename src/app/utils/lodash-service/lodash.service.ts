import { Injectable } from '@angular/core';
import lodash from 'lodash';

@Injectable()
export class LodashSvc {
  constructor(){
    Object.assign(this, lodash)
  }
}
