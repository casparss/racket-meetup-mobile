import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { messagesModel } from './messages.fixture';
import { NavController, ModalController } from 'ionic-angular';
import { MessageItemInt } from './messages.interface';
import { ChatSvc } from '../chat/chat.service';
import { UserSvc } from '../user-service';
import { ChatCom } from '../chat/chat.component';
import { WsSvc } from '../web-sockets-service';
import { FollowersCom } from '../followers/followers.component';
import { ModelSvc, Collection, CHAT } from '../model-service/model.service';
import { ChatModel } from '../chat/chat.model';
import { RootNavSvc } from '../welcome/root-nav.service';

interface ParamsInt {
	_id?: string
}

@Component({
	templateUrl: './message-list.view.html',
	selector:'message-list'
})
export class MessageListCom {

	private chatCollection: Collection;
	private isEmptyState: boolean;
	private chatSub: Subscription;

	constructor(
		private nav: NavController,
		private chatSvc: ChatSvc,
		private ws: WsSvc,
		private modalController : ModalController,
		private modelSvc: ModelSvc,
		userSvc: UserSvc,
		private rootNavSvc: RootNavSvc
	){
		let currentUser_id = userSvc .current.user._id;
		this.chatCollection = this.modelSvc.createCollection(CHAT, { currentUser_id });
		this.chatSub = this.chatSvc.$.subscribe(chats => {
			this.chatCollection.update(chats);
			this.checkEmptyState();
		});
	}

	ionViewWillUnload(){
		this.chatSub.unsubscribe();
		this.chatCollection.destroy();
	}

	checkEmptyState(){
		this.isEmptyState = this.chatCollection.length === 0 ? true : false;
	}

	openMessage(chatModel:ChatModel): void {
		this.rootNavSvc.nav.push(ChatCom, { chatModel });
	}

	trackById(index: number, chat: any) {
		return chat._id;
	}

	openAddressBook() {
		let addressBookModal = this.modalController.create(FollowersCom, {
			isAddressBook: true
		});

		addressBookModal.onDidDismiss((params:ParamsInt = {}) => {
			if(params._id) {
				this.chatSvc.getChat([params._id])
					.subscribe(chat => this.nav.push(ChatCom, {
						chatModel: this.modelSvc.create(chat, null)
					}));
			}
		});

		addressBookModal.present();
	}

}
