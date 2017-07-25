import { Injectable, Injector, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataModel } from '../../utils/data-model';
import { UserInt } from './user.interface';
import { remove } from 'lodash';
import { UserUtils } from '../user-service/user.utils';
import { UserModelSvc } from '../user-service/user.model.service';

export class UserModel extends DataModel {
  public statusLengths$: BehaviorSubject<any> = new BehaviorSubject({});

  private userModel: UserInt;
  private utils;
  private userModelSvc;

  constructor(injector, userModel, ownerInstance){
    super(injector, userModel, ownerInstance);
    this.utils = injector.get(UserUtils);
    this.userModelSvc = injector.get(UserModelSvc);
    this.userModelSvc.onLengthsRetrieval
      .subscribe(lengthsData => this.lengthsRetrieval(lengthsData));
    this.subscribe();
  }

  updateDetails(details){
    this.update({ details });
  }

  toggleFollow(userId, isFriend){
    let user = this.getRawValue();
    let { followingThem } = user.followers;

    if(isFriend)
      followingThem.push(userId);
    else
      remove(followingThem, followerId => userId === followerId);

    this.update(user);
  }

  get $(){
    return this.get$().map(user => this.utils.populateExtraFields(user));
  }

  get user(): UserInt{
    return this.getValue();
  }

  get avatar$(){
    return this.get$().map(user => this.utils.generateProfileImage(this.getValue()));
  }

  generateProfileImage(){
    return this.utils.generateProfileImage(this.getValue());
  }

  lengthsRetrieval({ _id, lengths }){
    if(this._id === _id) this.statusLengths$.next(lengths);
  }
}
