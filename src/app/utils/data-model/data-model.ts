import { BehaviorSubject, Observable } from 'rxjs';

export class DataModel {
  public subject: BehaviorSubject<any>;
  private value: any;

  constructor(model?:any){
    this.subject = new BehaviorSubject(model);
    this.subject.subscribe(value => this.value = value);
  }

  protected get$(){
    return this.subject.asObservable();
  }

  get $(){
    return this.get$();
  }

  next(value){
    this.subject.next(value);
  }

  getValue(){
    return this.value;
  }
}
