import { Component } from '@angular/core'
import { ProfileMainCom } from '../profile-main/profile-main.component';
import { RankingsListCom } from '../rankings-list/rankings-list.component';
import { MessageListCom } from '../messages/message-list.component';

@Component({
	template:
	`
	<ion-tabs tabbarPlacement="bottom" tabbarLayout="icon-top">
		<ion-tab [root]="profileTabRoot" tabTitle="Profile" tabIcon="person"></ion-tab>
		<ion-tab [root]="rankingsTabRoot" tabTitle="Rankings" tabIcon="trophy"></ion-tab>
		<ion-tab [root]="messagesTabRoot" tabBadge="15" tabBadgeStyle="danger" tabTitle="Messages" tabIcon="filing"></ion-tab>
	</ion-tabs>
	`
})
export class TabsController {
	private profileTabRoot: any;
	private rankingsTabRoot: any
	private messagesTabRoot: any;

	constructor() {
		// this tells the tabs component which Pages
		// should be each tab's root Page
		this.profileTabRoot = ProfileMainCom;
		this.rankingsTabRoot = RankingsListCom;
		this.messagesTabRoot = MessageListCom;
	}
}
