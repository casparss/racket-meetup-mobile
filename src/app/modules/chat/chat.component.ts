import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ChatSvc } from './chat.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WsSvc } from '../web-sockets-service';

@Component({
	selector: 'chat',
	templateUrl: './chat.view.html'
})
export class ChatCom {

	private chatMessages$:any;
	private sendMessageForm: FormGroup;
	private chat: any;

	constructor(
		private svc: ChatSvc,
		private formBuilder: FormBuilder,
		private params: NavParams
	){
		this.chatMessages$ = svc.chatMessages$;
		this.chat = this.params.get("chat");
		this.svc.init(this.chat._id);
	}

	sendMessage(message){
		this.svc.sendMessage(message);
	}

	trackById(index: number, message: any){
		return message._id;
	}

	ngOnDestroy(){
		this.svc.destroy();
	}

}
