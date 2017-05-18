import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

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
  `
})
export class MessagesTab {};
