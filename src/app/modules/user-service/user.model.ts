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

  constructor(injector, userModel){
    super(injector, userModel);
    this.utils = injector.get(UserUtils);
    this.userModelSvc = injector.get(UserModelSvc);
    this.userModelSvc.onLengthsRetrieval
      .subscribe(lengthsData => this.lengthsRetrieval(lengthsData));
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
      followingThem.push(userId);
    } else {
      remove(followingThem, followerId => userId === followerId);
    }
    this.next(user);
  }

  get avatar$(){
    return this.get$().map(user => this.utils.generateProfileImage(user));
  }

  generateProfileImage(){
    let user = this.getValue();
    return this.utils.generateProfileImage(user);
  }

  lengthsRetrieval({ _id, lengths }){
    let user = this.getValue();
    if(user._id === _id) this.statusLengths$.next(lengths);
  }
}
