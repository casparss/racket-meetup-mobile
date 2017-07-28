import { Subject, Observable } from 'rxjs';

export class CustomSubject {
  public subject: Subject<any>;
  private value: any;

  constructor(model?:any){
    this.subject = new Subject();
    this.subject.subscribe(value => this.value = value);
    if(model) this.next(model);
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
