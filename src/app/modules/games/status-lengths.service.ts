import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/filter';

interface emitInt {
  _id: string,
  lengths: any,
  by: string
}

@Injectable()
export class StatusLengthsSvc {
  public statusLengths: Subject<any> = new Subject();
  constructor(){}
  $({ _id, by }){
    return this.statusLengths
      .asObservable()
      .filter(lengthsData => lengthsData.by === by && lengthsData._id === _id)
      .map(({lengths}) => lengths);
  }
  emit(data:emitInt){
    this.statusLengths.next(data);
  }
}
