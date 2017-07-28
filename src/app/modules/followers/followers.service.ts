import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DecHttp } from '../../utils/http';
import { ConfigSvc } from '../config/config.service';
import { BaseService } from '../../utils/base/base.service';

@Injectable()
export class FollowersSvc extends BaseService {

  followersUrl = "followers";

  constructor(
    http: DecHttp,
    private configSvc: ConfigSvc){
    super(http, configSvc);
  }

  getFollowers(userId?: string){
    let userParam = userId ? "/" + userId : "";
    return this._get(null, {}, this.followersUrl + userParam);
  }

}
