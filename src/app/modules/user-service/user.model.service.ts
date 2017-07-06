import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { UserUtils } from './user.utils';
import { DataModel } from '../../utils/data-model';
import { UserInt } from './user.interface';
import { remove } from 'lodash';

@Injectable()
export class UserModelSvc {
  public onLengthsRetrieval: EventEmitter<any> = new EventEmitter();
  constructor(private userUtils: UserUtils){}

  create(userModel: UserInt){
    return new UserModel(userModel, this.userUtils, this.onLengthsRetrieval);
  }
}

export class UserModel extends DataModel {
  public statusLengths$: Subject<any> = new Subject();

  constructor(userModel: UserInt, private utils, private onLengthsRetrieval){
    super(userModel);
    this.onLengthsRetrieval.subscribe(lengthsData => this.lengthsRetrieval(lengthsData));
  }

  get $(){
    return this.get$()
      .map(user => this.utils.populateExtraFields(user));
  }

  get user(): UserInt{
    return this.getValue();
  }

  updateDetails(details){
    let user = this.getValue();
    Object.assign(user.details, details);
    this.next(user);
  }

  toggleFollow(userId, isFriend){
    let user = this.getValue();
    let { followingThem } = user.followers;
    if(isFriend) {
      followingThem.push(userId)
    } else {
      remove(followingThem, followerId => userId === followerId);
    }
    this.next(user);
  }

  generateProfileImage(){
    let user = this.getValue();
    return this.utils.generateProfileImage(user._id);
  }

  lengthsRetrieval({ _id, lengths }){
    let user = this.getValue();
    if(user._id === _id) this.statusLengths$.next(lengths);
  }
}
