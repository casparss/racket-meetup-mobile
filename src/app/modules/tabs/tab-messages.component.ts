import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MessageListCom} from '../../modules/messages/message-list.component';

@Component({
  template: 
  `
  	<ion-header>
	<ion-navbar>
		<ion-title>Messages</ion-title>
	</ion-navbar>
	</ion-header>

	<ion-content class="messages-tab">
		<message-list></message-list>
	</ion-content>
  `,
  directives: [MessageListCom]
})
export class MessagesTab {};