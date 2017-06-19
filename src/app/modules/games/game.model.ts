import { BehaviorSubject } from 'rxjs';

export class GameModel {
  private subject: BehaviorSubject<any>;

  constructor(game){
    this.subject = new BehaviorSubject(game);
  }

  get $(){
    return this.subject.asObservable();
  }
}
