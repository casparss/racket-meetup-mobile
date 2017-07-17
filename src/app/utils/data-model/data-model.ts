import { BehaviorSubject, Observable } from 'rxjs';
import { WsSvc } from '../../modules/web-sockets-service/web-sockets.service';
import * as moment from 'moment';

export class DataModel {
  public subject: BehaviorSubject<any>;
  private value: any;
  private ws: any;
  private updateEv: any;

  constructor(injector, model?:any){
    this.subject = new BehaviorSubject(model);
    this.subject.subscribe(value => this.value = value);
    this.ws = injector.get(WsSvc);
    this.setEvents();
  }

  setEvents(){
    let { _id, modelType } = this.value;
    this.updateEv = this.ws.on(`update:${modelType}:${_id}`, game => this.update(game));
  }

  update(model: any){

    let modelValue;
    if(model.getValue){
      modelValue = model.getValue();
    } else {
      modelValue = model;
    }

    let isOlder = moment(this.value.updatedAt).isBefore(moment(modelValue.updatedAt));
    if(isOlder) this.next(model);
  }

  next(value){
    this.subject.next(value);
  }

  getValue(){
    return this.value;
  }

  protected get$(){
    return this.subject.asObservable();
  }

  get _id(){
    return this.value._id;
  }

  get type(){
    return this.value.modelType;
  }

  get $(){
    return this.get$();
  }

  destroy(){
    this.updateEv.off();
  }

}
