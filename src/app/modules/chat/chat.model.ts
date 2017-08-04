import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { DataModel } from '../../utils/data-model';
import { ModelSvc } from '../model-service/model.service';
import { UserUtils } from '../user-service/user.utils';
import * as moment from 'moment';
import { reject, map, last } from 'lodash';
import calendarDateConfig from '../../utils/calendar-date-config.json';

export class ChatModel extends DataModel {
  private modelSvc: ModelSvc;
  private userUtils: UserUtils;
  private currentUser_id: string;
  public onChange: EventEmitter<any> = new EventEmitter();
  public upToDateStatus$: Subject<boolean> = new Subject();

  constructor(injector, chatModel, ownerInstance, opts?){
    super(injector, chatModel, ownerInstance);
    if(!opts.currentUser_id) throw new Error("Must provide current user ID!");
    this.currentUser_id = opts.currentUser_id;
    this.modelSvc = injector.get(ModelSvc);
    this.userUtils = injector.get(UserUtils);
    this.subscribe();

    this.ws.onAuthenticted.subscribe(isAuth => {
      if(isAuth){
        this.ws.socket.emit("joining:chat", this._id);
        this.setWsEvents();
      }
    });
  }


  //////////////////////
  //Websocket methods //
  //////////////////////


  setWsEvents(){
		this.ws.socket.on("message", msgPackage => this.newMessageRecieved(msgPackage));
	}

  sendMessage(message:string){
		let msgPackage = { chatId: this._id, message };
		this.ws.socket.emit("send:message", msgPackage);
	}

  getMessageHistory(){
		this.ws.socket.emit("request:messagehistory", this._id, messages => this.updateMessageHistory(messages));
	}

  updateMessageHistory(messageHistory = []){
    let chat = this.getRawValue();
    chat.conversation = messageHistory;
    this.next(chat);
	}

	newMessageRecieved(message){
    if(message.chatId === this._id){
      let chat = this.getRawValue();
      chat.conversation = chat.conversation ? chat.conversation : [];
      chat.conversation.push(message);
      chat.updatedAt = message.updatedAt;
      this.next(chat);
      this.onChange.emit();
    }
	}

  setUpToDate(){
    if(!this.isUpToDate()){
        this.value.upToDate.push(this.currentUser_id);
        this.next(this.value);
    }
		this.ws.socket.emit("uptodatewith:chat", this._id);
	}

  isUpToDate(){
    return this.value.upToDate.indexOf(this.currentUser_id) !== -1;
  }

  numUnread(){
    return this.isUpToDate() ? 0 : 1;
  }

	destroy(){
    super.destroy();
		this.ws.socket.off("message");
		this.ws.socket.emit("leaving:chat", this._id);
	}


  /////////////
  // getters //
  /////////////


  get $(){
    return this.get$()
      .map(chat => this.addChatMetaData(chat));
  }

  get conversation$(){
		return this.get$()
			.map(({ conversation = [] }) => conversation.map(message => new Message(message, this.currentUser_id, this.userUtils)))
			.map(chatMessages => this.transformChatObject(chatMessages))
      .share();
	}

  get previewMessage(){
    let { conversation, preview } = this.value;
    return (last(conversation ? conversation : preview) || {}).message
  }


  ////////////////////////
  //Transform functions //
  ////////////////////////


	addChatMetaData(chat){
		let user = reject(chat.participants, (user:any) =>  user._id === this.currentUser_id);
		chat.otherUser = user[0];
		chat.img = this.userUtils.generateProfileImage(chat.otherUser);
		return chat;
	}

	transformChatObject(chatMessages){
		let { length } = chatMessages;

		if(length === 0) {
			return [];
		} else if(length === 1){
			return this.insertDate(chatMessages);
		} else {
			return this.insertDates(chatMessages);
		}
	}

	insertDate(chatMessages){
		let chat = chatMessages[0]
		return [new DateLabel(chat.createdAt), chat].reverse();
	}

	insertDates(chatMessages){
		return chatMessages.reduce((accumulator, currentValue, index) => {
			let list = (index === 1 ? [accumulator] : accumulator);
			let lastElement = last(list);
			let isDifferentDay = !lastElement.createdAt.isSame(currentValue.createdAt, 'day');

			if(list.length === 1){
				list.unshift(new DateLabel(accumulator.createdAt));
			}

			if(isDifferentDay){
				list.push(new DateLabel(currentValue.createdAt));
			}

			list.push(currentValue);
			return list;
		}).reverse();
	}

}


///////////////////////////////
//Conversation data classesd //
///////////////////////////////


class DateLabel {
	type: string = "date";
	date: any;

	constructor(date){
		this.date = date;
	}

	calendarDate(){
		return this.date.calendar(null, calendarDateConfig);
	}
}

class Message {
	_id: string;
	name: string;
	message: string;
	createdAt: any;
	type: string = "message";
  public avatar: string;

	constructor(
		chat:any,
		private currentUser_id: string,
		private userUtils: UserUtils
	){
		Object.assign(this, chat);
		this.createdAt = moment(this.createdAt);
    this.avatar = this.userUtils.generateProfileImage(this);
	}

	isMe(){
		return this._id === this.currentUser_id;
	}

}
