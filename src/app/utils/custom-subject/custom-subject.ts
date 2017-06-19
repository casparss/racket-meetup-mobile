import { Subject, Observable } from 'rxjs';

export class CustomSubject {
  public subject: Subject<any>;
  private value: any;

  constructor(){
    this.subject = new Subject();
    this.subject.subscribe(value => this.value = value);
  }

  get $(){
    return this.subject.asObservable();
  }

  next(value){
    this.subject.next(value);
  }

  getValue(){
    return this.value;
  }
}
