import { ModelSvc, CHAT } from '../model-service/model.service';
import { orderBy, debounce } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from '../../utils/base/base.service';
import { DecHttp, HttpUtils } from '../../utils/http';
import { UserSvc } from '../user-service/user.service';
import { ConfigSvc } from '../config/config.service';
import { UserUtils } from '../user-service/user.utils';
import { WsSvc } from '../web-sockets-service';

@Injectable()
export class ChatSvc extends BaseService {

	url = 'inbox';
	private chatsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  public unreadChatsLength$: BehaviorSubject<any> = new BehaviorSubject(0);

	constructor(
		http:DecHttp,
		private userSvc: UserSvc,
		configSvc: ConfigSvc,
		private userUtils: UserUtils,
    private modelSvc: ModelSvc,
		private ws: WsSvc
	){
		super(http, configSvc);
    this.getChats().subscribe();

		this.ws.onAuthenticted.subscribe(isAuth => {
      if(isAuth) this.setWsEvents();
    });
	}

	setWsEvents(){
		this.ws.on(`newChat:${this.userSvc.current._id}`, chat => this.newIncomingChat(chat));
	}

	newIncomingChat(chat){
		let chats = [...this.chatsSubject.getValue()];
		chats.push(this.createChatModel(chat));
		this.chatsSubject.next(chats);
	}

  getUnreadChatLengths(chats){
    let num = chats.filter(chat => !chat.isUpToDate()).length;
    this.unreadChatsLength$.next(num);
  }

	getChats(){
		return this._get('chats')
      .map(chats => chats.map(chat => this.createChatModel(chat)))
			.do(chats => chats.forEach(chatModel => chatModel.onChange.subscribe(() => this.chatUpdated())))
			.do(chats => this.getUnreadChatLengths(chats))
      .do(chatModelCollection => this.chatsSubject.next(chatModelCollection));
	}

	chatUpdated = debounce(() => this.chatsSubject.next(this.chatsSubject.getValue()), 2000, { trailing: true } );

  getChat(patricipants:[string]){
    return this._get(null, {
      search: HttpUtils.urlParams({
        userIds: patricipants.join(',')
      })
    }, "chat");
  }

	checkUnreadLengths(){
		let chats = this.chatsSubject.getValue();
		this.getUnreadChatLengths(chats);
	}

	createChatModel(chat){
		let currentUser_id = this.userSvc.current._id;
		return this.modelSvc.create(chat, null, { currentUser_id });
	}

  get $(){
    return this.chatsSubject.asObservable()
			.do(() => console.log("running"))
      .do(chats => this.getUnreadChatLengths(chats))
			.map(chats => {
				return orderBy(chats, ['updatedAt'], ['desc']);
			});
  }

}