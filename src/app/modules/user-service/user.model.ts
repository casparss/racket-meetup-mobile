import { Injectable, Injector, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModelSvc, CLUB } from '../model-service/model.service';
import { DataModel } from '../../utils/data-model';
import { UserInt } from './user.interface';
import { remove } from 'lodash';
import { UserUtils } from '../user-service/user.utils';
import { StatusLengthsSvc } from '../games/status-lengths.service';

export class UserModel extends DataModel {
  public statusLengths$: BehaviorSubject<any> = new BehaviorSubject({});
  private modelSvc: ModelSvc;
  private userModel: UserInt;
  private utils;
  private onLengthsRetrievalSub: Subscription;
  public clubs: any;

  constructor(injector, userModel, ownerInstance, opts?){
    super(injector, userModel, ownerInstance);
    this.utils = injector.get(UserUtils);
    this.modelSvc = injector.get(ModelSvc);
    this.createClubsCollection(userModel);
    this.subscribe();
  }

  createClubsCollection(userModel){
    this.clubs = this.modelSvc
      .createCollection(CLUB)
      //.update(userModel.clubs);
    //this.$.subscribe(({clubs}) => this.clubs.update(clubs));
  }

  destroy(){
    super.destroy();
    this.onLengthsRetrievalSub.unsubscribe();
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

  toggleMyClub(clubModel, isMyClub){
    if(isMyClub)
      this.clubs.push(clubModel);
    else
      this.clubs.remove(clubModel._id);
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
}
