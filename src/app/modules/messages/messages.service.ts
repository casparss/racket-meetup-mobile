import { Injectable } from '@angular/core';
import { reject } from 'lodash';
import { BaseService } from '../../utils/base/base.service';
import { DecHttp, HttpUtils } from '../../utils/http';
import { UserSvc } from '../user-service/user.service';
import { ConfigSvc } from '../config/config.service';
import { UserUtils } from '../user-service/user.utils';

@Injectable()
export class MessagesSvc extends BaseService{

	url = 'inbox';
	private _chats$: any;

	constructor(
		http:DecHttp,
		private userSvc: UserSvc,
		configSvc: ConfigSvc,
		private userUtils: UserUtils
	){
		super(http, configSvc);
		this._chats$ = this.create$('chats');
	}

	getChats(){
		return this._get('chats');
	}

  getChat(patricipants:[string]){
    return this._get(null, {
      search: HttpUtils.urlParams({
        userIds: patricipants.join(',')
      })
    }, "chat");
  }

}
