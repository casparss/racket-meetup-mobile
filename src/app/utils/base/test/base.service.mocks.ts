import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base.service';
import { DecHttp } from '../../http';
import { ConfigSvc } from '../../../modules/config/config.service';

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
  constructor(http: DecHttp, configSvc: ConfigSvc){
    super(http, configSvc);
  }
}
