import { Component } from '@angular/core'
import { Subscription } from 'rxjs';
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
			tabIcon="person"
			[tabBadge]="pendingLength"
			tabBadgeStyle="danger"></ion-tab>
		<ion-tab [root]="rankingsTabRoot" tabIcon="trophy"></ion-tab>
		<ion-tab
			[root]="chatsTabRoot"
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
	private statusLengthsSub: Subscription;

	constructor(private userSvc: UserSvc, private chatSvc: ChatSvc) {
		this.profileTabRoot = ProfileMainCom;
		this.rankingsTabRoot = RankingsListCom;
		this.chatsTabRoot = MessageListCom;
	}

	ngOnInit(){
		this.statusLengthsSub = this.userSvc.current.statusLengths$.subscribe(statuses => {
			let { pending } = statuses;
			this.pendingLength = pending;
		});
	}

	ngOnDestroy(){
		this.statusLengthsSub.unsubscribe();
	}
}
