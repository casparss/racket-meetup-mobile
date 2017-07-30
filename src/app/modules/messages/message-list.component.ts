import { Component } from '@angular/core';
import { messagesModel } from './messages.fixture';
import { NavController, App, ModalController } from 'ionic-angular';
import { MessageItemInt } from './messages.interface';
import { MessagesSvc } from './messages.service';
import { UserSvc } from '../user-service';
import { ChatCom } from '../chat/chat.component';
import { WsSvc } from '../web-sockets-service';
import { FollowersCom } from '../followers/followers.component';
import { ModelSvc, Collection, CHAT } from '../model-service/model.service';
import { ChatModel } from '../chat/chat.model';

@Component({
	templateUrl: './message-list.view.html',
	selector:'message-list'
})
export class MessageListCom {

	private chatCollection: Collection;

	constructor(
		private nav: NavController,
		private svc: MessagesSvc,
		public appCtrl: App,
		private ws: WsSvc,
		private modalController : ModalController,
		private modelSvc: ModelSvc,
		userSvc: UserSvc
	){
		let currentUser_id = userSvc.current.user._id;
		this.chatCollection = this.modelSvc.createCollection(CHAT, { currentUser_id });
	}

	ionViewDidEnter() {
		this.getChats();
	}

	getChats() {
		this.svc.getChats().subscribe(chats => this.chatCollection.update(chats));
	}

	openMessage(chatModel:ChatModel): void {
		this.nav.push(ChatCom, { chatModel });
	}

	trackById(index: number, chat: any) {
		return chat._id;
	}

	openAddressBook() {
		let addressBookModal = this.modalController.create(FollowersCom, {
			isAddressBook: true
		});

		addressBookModal.onDidDismiss(({_id} = {}) => {
			if(_id) {
				this.svc.getChat([_id])
					.subscribe(chat => this.nav.push(ChatCom, {
						chatModel: this.modelSvc.create(chat, null)
					}));
			}
		});

		addressBookModal.present();
	}

}
