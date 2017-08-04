import { Component } from '@angular/core'
import { ProfileMainCom } from '../profile-main/profile-main.component';
import { RankingsListCom } from '../rankings-list/rankings-list.component';
import { MessageListCom } from '../messages/message-list.component';
import { UserSvc } from '../user-service';
import { ChatSvc } from '../chat/chat.service';

@Component({
	template:
	`
	<ion-tabs tabbarPlacement="bottom" tabbarLayout="icon-top">
		<ion-tab
			[root]="profileTabRoot"
			tabTitle="Profile"
			tabIcon="person"
			[tabBadge]="pendingLength"
			tabBadgeStyle="danger"></ion-tab>
		<ion-tab [root]="rankingsTabRoot" tabTitle="Rankings" tabIcon="trophy"></ion-tab>
		<ion-tab
			[root]="chatsTabRoot"
			tabTitle="Chats"
			tabIcon="chatbubbles"
			[tabBadge]="chatSvc.unreadChatsLength$ | async"
			tabBadgeStyle="danger"></ion-tab>
	</ion-tabs>
	`
})
export class TabsController {
	private profileTabRoot: any;
	private rankingsTabRoot: any
	private chatsTabRoot: any;
	private pendingLength: number;

	constructor(private userSvc: UserSvc, private chatSvc: ChatSvc) {
		this.profileTabRoot = ProfileMainCom;
		this.rankingsTabRoot = RankingsListCom;
		this.chatsTabRoot = MessageListCom;
	}

	ngOnInit(){
		this.userSvc.current.statusLengths$.subscribe(statuses => {
			let { pending, accepted } = statuses;
			this.pendingLength = pending;
			//this.accepted = accepted;
		});
	}
}
