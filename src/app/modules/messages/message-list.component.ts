import { Component } from '@angular/core';
import { messagesModel } from './messages.fixture';
import { NavController, App } from 'ionic-angular';
import { MessageItemInt } from './messages.interface';
import { MessagesSvc } from './messages.service';
import { ChatCom } from './chat.component';
import { WsSvc } from '../web-sockets-service';

@Component({
	templateUrl: './message-list.view.html',
	selector:'message-list'
})
export class MessageListCom{

	private chats$: any;

	constructor(
		private nav: NavController,
		private svc: MessagesSvc,
		public appCtrl: App,
		private ws: WsSvc
	){
		this.chats$ = this.svc.chats$;
	}

	ngOnInit(){
		this.svc.getChats().subscribe();
	}

	openMessage(chat:any): void{
		this.nav.push(ChatCom, { chat });
	}

}
