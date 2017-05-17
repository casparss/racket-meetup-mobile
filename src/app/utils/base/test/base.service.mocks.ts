import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base.service';
import { DecHttp } from '../../http';

const dataMock = {
  somemockdata: true
};

const returnObservable = () =>
  new Observable(observer => observer.next(dataMock))

export class DecHttpMock{
  post(){ return returnObservable(); }
  put(){ return returnObservable(); }
  delete(){ return returnObservable(); }
  get(){ return returnObservable(); }
}

@Injectable()
export class FacadeBaseService extends BaseService {
  constructor(http: DecHttp){
    super(http);
  }
}
