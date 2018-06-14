import { EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { DataModel } from '../../utils/data-model';
import { ModelSvc } from '../model-service/model.service';
import { UserUtils } from '../user-service/user.utils';
import * as moment from 'moment';
import { reject, last, pull } from 'lodash';
import { CALENDAR_DATE_CONFIG } from '../../utils/calendar-date-config';

export class ChatModel extends DataModel {
  private onAuthentictedSub: Subscription;
  private modelSvc: ModelSvc;
  private userUtils: UserUtils;
  private currentUser_id: string;
  public onChange: EventEmitter<any> = new EventEmitter();
  public upToDateStatus$: Subject<boolean> = new Subject();
  public isViewing$: BehaviorSubject<any> = new BehaviorSubject(false);
  private messageRecieved: any;

  constructor(injector, chatModel, ownerInstance, opts?){
    super(injector, chatModel, ownerInstance);
    if(!opts.currentUser_id) throw new Error("Must provide current user ID!");
    this.currentUser_id = opts.currentUser_id;
    this.modelSvc = injector.get(ModelSvc);
    this.userUtils = injector.get(UserUtils);
    this.subscribe();
    this.messageRecieved = msgPackage => this.newMessageRecieved(msgPackage)

    this.onAuthentictedSub = this.ws.onAuthenticted.subscribe(isAuth => {
      if(isAuth){
        this.ws.socket.emit("joining:chat", this._id);
        this.setWsEvents();
      }
    });

    this.ws.onConnect
      .subscribe(() => this.setWsEvents());
  }

  viewing(){
    this.isViewing$.next(true);
    this.setUpToDate();
  }

  stoppedViewing(){
    this.isViewing$.next(false);
  }


  //////////////////////
  //Websocket methods //
  //////////////////////


  setWsEvents(){
    this.ws.socket.off("message", this.messageRecieved);
		this.ws.socket.on("message", this.messageRecieved);
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
      this.sendMessageReceipt(message);
      let chat = this.getRawValue();
      chat.conversation = chat.conversation ? chat.conversation : [];
      chat.conversation.push(message);
      chat.updatedAt = message.updatedAt;
      this.setUpToDate(chat);
      this.onChange.emit();
    }
	}

  sendMessageReceipt({ chatId, _id }){
    this.ws.socket.emit('messagereceipt', `${chatId}:${_id}`);
  }

  setUpToDate(chat = this.getRawValue()){
    if(!this.isViewing$.getValue()){
      pull(chat.upToDate, this.currentUser_id)
    } else if(!this.isUpToDate()){
      chat.upToDate.push(this.currentUser_id);
      this.emitUpToDate();
    }
    this.next(chat);
	}

  emitUpToDate(){
    this.ws.socket.emit("uptodatewith:chat", this._id);
  }

  isUpToDate(){
    return this.value.upToDate.indexOf(this.currentUser_id) !== -1;
  }

	destroy(){
    super.destroy();
    this.onAuthentictedSub.unsubscribe();
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
    return ((conversation ? last(conversation) : preview) || {}).message;
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
//Conversation data classess //
///////////////////////////////


class DateLabel {
  _id: string;
	type: string = "date";
	date: any;

	constructor(date){
		this.date = this._id = date;
	}

	calendarDate(){
		return this.date.calendar(null, CALENDAR_DATE_CONFIG);
	}
}

class Message {
  _id: string;
	userId: string;
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
    this.avatar = this.userUtils.generateProfileImage({ _id: this.userId });
	}

	isMe(){
		return this.userId === this.currentUser_id;
	}

}
