import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

export class DataModel {
  public subject: BehaviorSubject<any>;
  private value: any;

  constructor(model?:any){
    this.subject = new BehaviorSubject(model);
    this.subject.subscribe(value => this.value = value);
  }

  update(model: any){
    let modelValue = model.getValue();
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

}
