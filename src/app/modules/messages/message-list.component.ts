import { Component } from '@angular/core';
import { messagesModel } from './messages.fixture';
import { NavController, App, ModalController } from 'ionic-angular';
import { MessageItemInt } from './messages.interface';
import { MessagesSvc } from './messages.service';
import { ChatCom } from '../chat/chat.component';
import { WsSvc } from '../web-sockets-service';
import { FollowersCom } from '../followers/followers.component';

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
		private ws: WsSvc,
		private modalController : ModalController
	){
		this.chats$ = this.svc.chats$;
	}

	ionViewDidEnter() {
		this.svc.getChats().subscribe();
	}

	openMessage(chat:any): void{
		this.nav.push(ChatCom, { chat });
	}

	trackById(index: number, chat: any){
		return chat._id;
	}

	openAddressBook(){
		let addressBookModal = this.modalController.create(FollowersCom, {
			isAddressBook: true
		});

		addressBookModal.onDidDismiss(({_id} = {}) => {
			if(_id) this.svc.getChat([_id]).subscribe(chat => this.nav.push(ChatCom, { chat }));
		});

		addressBookModal.present();
	}

}
