import { BehaviorSubject, Observable } from 'rxjs';
import { WsSvc } from '../../modules/web-sockets-service/web-sockets.service';
import * as moment from 'moment';

export class DataModel {
  public subject: BehaviorSubject<any>;
  protected value: any;
  protected ws: any;
  protected updateEv: any;
  protected owners: Set<any> = new Set();
  protected _isPermanent: boolean = false;

  constructor(injector, model, ownerInstance){
    if(ownerInstance)
      this.owners.add(ownerInstance);
    else
      this._isPermanent = true;

    this.subject = new BehaviorSubject(model);
    this.subject.subscribe(value => this.value = value);
    this.ws = injector.get(WsSvc);
    this.setEvents();
  }

  setEvents(){
    let { _id, modelType } = this.value;
    this.updateEv = this.ws.on(`update:${modelType}:${_id}`, game => this.update(game));
  }

  update(model: any, ownerInstance?){
    this.owners.add(ownerInstance);
    let modelValue = model.getValue ? model.getValue() : model;
    let isOlder = moment(this.value.updatedAt).isBefore(moment(modelValue.updatedAt));
    if(isOlder) this.next(modelValue);
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

  get isPermanent(){
    return this._isPermanent
  }

  destroy(){
    this.updateEv.off();
  }

  disown(ownerInstance){
    this.owners.delete(ownerInstance);
  }

  isOwnerlessDestroy(){
    let isOwnerless = this.owners.size === 0;
    if(isOwnerless) this.destroy();
    return isOwnerless;
  }

}
