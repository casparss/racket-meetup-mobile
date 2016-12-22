import {Component} from '@angular/core';
import {messagesModel} from './messages.fixture';
import {NavController} from 'ionic-angular';
import {MessageItemInt} from './messages.interface';
import {MessagesSvc} from './messages.service';
import {ChatCom} from './chat.component';

@Component({
	templateUrl: './message-list.view.html',
	selector:'message-list',
	providers:[MessagesSvc]
})
export class MessageListCom{

	private chats$: any;

	constructor(private nav: NavController, private svc: MessagesSvc){
		this.chats$ = this.svc.chats$;
	}

	ngOnInit(){
		this.svc.getChats();
	}

	openMessage(id:number): void{
		this.nav.push(ChatCom, {
			id: id
		});
	}

}
