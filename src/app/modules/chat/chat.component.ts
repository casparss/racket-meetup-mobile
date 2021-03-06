import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WsSvc } from '../web-sockets-service';
import { ChatModel } from '../chat/chat.model';
import { ChatSvc } from './chat.service';
import { TextDialogueCom } from './text-dialogue.component';

@Component({
	selector: 'chat',
	templateUrl: './chat.view.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatCom {
	private chatSub: Subscription;
	private chatModel: ChatModel;
	private conversation: any = [];
	@ViewChild(TextDialogueCom) textDialogueCom: TextDialogueCom;

	constructor(
		private params: NavParams,
		private chatSvc: ChatSvc
	){
		this.chatModel = this.params.get("chatModel");
		this.chatModel.getMessageHistory();
	}

	sendMessage(message){
		this.chatModel.sendMessage(message);
	}

	blur(){
		this.textDialogueCom.blur();
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

	ionViewDidUnload(){
		this.chatSub.unsubscribe();
	}
}
