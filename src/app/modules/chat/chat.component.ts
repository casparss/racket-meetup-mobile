import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WsSvc } from '../web-sockets-service';
import { ChatModel } from '../chat/chat.model';

@Component({
	selector: 'chat',
	templateUrl: './chat.view.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatCom {
	private chatModel: ChatModel;

	constructor(private params: NavParams){
		this.chatModel = this.params.get("chatModel");
		this.chatModel.getMessageHistory();
	}

	sendMessage(message){
		this.chatModel.sendMessage(message);
	}

	trackById(index: number, message: any){
		return message._id;
	}

	ionViewDidEnter(){

	}

}