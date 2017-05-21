import {Injectable} from '@angular/core';
import {map} from 'lodash';
import {BaseService} from '../../utils/base/base.service';
import {DecHttp} from '../../utils/http';
import {UserSvc} from '../user-service/user.service';
import {WsSvc} from '../web-sockets-service/';
import { ConfigSvc } from '../config/config.service';

@Injectable()
export class ChatSvc extends BaseService{

	private _chatMessages$: any;
	private _chatId: any;
	private currentChat: Array<any> = [];

	constructor(
		http:DecHttp,
		private userSvc: UserSvc,
		private ws: WsSvc,
		configSvc: ConfigSvc
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
		this.ws.socket.emit("request:messagehistory", this._chatId);
	}

	setEvents(){
		this.ws.socket.on("messagehistory", messages => this.updateMessageHistory(messages));
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
		return this._chatMessages$.map(chat => map(chat, message => new Message(message, this.userSvc)));
	}

	sendMessage(message:string){
		let msgPackage = {chatId: this._chatId, message: message};
		this.ws.socket.emit("send:message", msgPackage);
	}

	destroy(){
		this.ws.socket.off("message");
		this.ws.socket.emit("leaving:chat");
	}

}

class Message {

	_id: string;
	name: string;
	message: string;
	img: string;
	createdAt: string;

	constructor(chat:any, private userSvc: UserSvc){
		this._id = chat._id;
		this.name = chat.name; //logic to populate name
		this.message = chat.message;
		this.img = chat.img; //logic to populate img
		this.createdAt = chat.createdAt || new Date();
	}

	isMe(){
		return this._id === this.userSvc.current._id;
	}

}
