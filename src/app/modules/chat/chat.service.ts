import { Injectable } from '@angular/core';
import { map, reduce, last } from 'lodash';
import { BaseService } from '../../utils/base/base.service';
import { DecHttp } from '../../utils/http';
import { UserSvc } from '../user-service/user.service';
import { WsSvc } from '../web-sockets-service/';
import { ConfigSvc } from '../config/config.service';
import { UserUtils } from '../user-service/user.utils';
import * as moment from 'moment';

@Injectable()
export class ChatSvc extends BaseService{

	private _chatMessages$: any;
	private _chatId: any;
	private currentChat: Array<any> = [];

	constructor(
		http:DecHttp,
		private userSvc: UserSvc,
		private ws: WsSvc,
		configSvc: ConfigSvc,
		private userUtils: UserUtils
	){
		super(http, configSvc);
		this._chatMessages$ = this.create$('chatMessages');
	}

	init(chatId){
		this._chatId = chatId;
		this.ws.socket.emit("joining:chat", this._chatId);
		this.setEvents();
		this.getMessageHistory();
	}

	getMessageHistory(){
		this.ws.socket.emit("request:messagehistory", this._chatId, messages => this.updateMessageHistory(messages));
	}

	setEvents(){
		this.ws.socket.on("message", msgPackage => this.newMessageRecieved(msgPackage));
	}

	updateMessageHistory(messageHistory){
		this.currentChat = messageHistory || this.currentChat;
		this.updateChat();
	}

	newMessageRecieved(message){
		this.currentChat.push(message);
		this.updateChat();
	}

	updateChat(){
		this.subjects['chatMessages'].next(this.currentChat);
	}

	get chatMessages$(){
		return this._chatMessages$
			.map(chatMessages => map(chatMessages, message => new Message(message, this.userSvc, this.userUtils)))
			.map(chatMessages => this.transformChatObject(chatMessages));
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

	sendMessage(message:string){
		let msgPackage = { chatId: this._chatId, message };
		this.ws.socket.emit("send:message", msgPackage);
	}

	destroy(){
		this.ws.socket.off("message");
		this.ws.socket.emit("leaving:chat", this._chatId);
	}

}

class DateLabel {
	type: string = "date";
	date: any;

	constructor(date){
		this.date = date;
	}

	calendarDate(){
		return this.date.calendar(null, {
		    sameDay: '[Today]',
		    nextDay: '[Tomorrow]',
		    nextWeek: 'dddd',
		    lastDay: '[Yesterday]',
		    lastWeek: '[Last] dddd',
		    sameElse: 'DD/MM/YYYY'
		});
	}
}

class Message {
	_id: string;
	name: string;
	message: string;
	createdAt: any;
	type: string = "message";

	constructor(
		chat:any,
		private userSvc: UserSvc,
		private userUtils: UserUtils
	){
		Object.assign(this, chat);
		this.createdAt = moment(this.createdAt);
	}

	isMe(){
		return this._id === this.userSvc.current.user._id;
	}

	get avatar(){
		return this.userUtils.generateProfileImage(this)
	}
}
