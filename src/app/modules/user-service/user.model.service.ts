import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class UserModelSvc {
  public onLengthsRetrieval: EventEmitter<any> = new EventEmitter();
  constructor(){}
}
