import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WsSvc } from '../web-sockets-service';
import { ChatModel } from '../chat/chat.model';
import { ChatSvc } from './chat.service';

@Component({
	selector: 'chat',
	templateUrl: './chat.view.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatCom {
	private chatModel: ChatModel;
	private conversation: any = [];

	constructor(
		private params: NavParams,
		private chatSvc: ChatSvc
	){
		this.chatModel = this.params.get("chatModel");
		this.chatModel.getMessageHistory();
		this.chatModel.conversation$.subscribe(conversation => this.conversation = conversation);
	}

	sendMessage(message){
		this.chatModel.sendMessage(message);
	}

	trackById(index: number, message: any){
		return message._id;
	}

	ionViewDidEnter(){
		this.chatModel.viewing();
		this.chatSvc.checkUnreadLengths();
	}

	ionViewDidLeave() {
		this.chatModel.stoppedViewing();
	}

}
