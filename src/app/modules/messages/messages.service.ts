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

	get chats$(){
		return this._chats$.map(data => data.map(chat => this.addChatMetaData(chat)));
	}

	addChatMetaData(chat){
		let user = reject(chat.participants,
			(user:any) =>  user._id === this.userSvc.current.user._id
		);
		chat.otherUser = user[0];
		chat.img = this.userUtils.generateProfileImage(chat.otherUser);
		return chat;
	}

	getChats(){
		return this._get('chats');
	}

  getChat(patricipants:[string]){
    return this._get(null, {
      search: HttpUtils.urlParams({
        userIds: patricipants.join(',')
      })
    }, "chat")
			.map(chat => this.addChatMetaData(chat))
  }

}
