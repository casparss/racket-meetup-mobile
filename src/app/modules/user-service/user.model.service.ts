import { Injectable } from '@angular/core';
import { UserUtils } from './user.utils';
import { DataModel } from '../../utils/data-model';
import { UserInt } from './user.interface';
import { remove } from 'lodash';

@Injectable()
export class UserModelSvc {
  constructor(private userUtils: UserUtils){}

  create(userModel: UserInt){
    return new UserModel(userModel, this.userUtils);
  }
}

export class UserModel extends DataModel {
  constructor(userModel: UserInt, private utils){
    super(userModel);
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
}
