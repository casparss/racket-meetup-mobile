import { Component } from '@angular/core'
import { Subscription } from 'rxjs';
import { ProfileMenuCom } from '../profile-menu/profile-menu.component';
import { RankingsCom } from '../rankings/rankings.component';
import { MessageListCom } from '../messages/message-list.component';
import { ClubsCom } from '../clubs/clubs.component';
import { UserSvc } from '../user-service';
import { ChatSvc } from '../chat/chat.service';
import { StatusLengthsSvc } from '../games/status-lengths.service';
import { USER } from '../model-service/model.service';

@Component({
	template:
	`
	<ion-tabs tabbarPlacement="bottom" tabbarLayout="icon-top">
		<ion-tab
			[root]="profileTabRoot"
			tabIcon="person"
			[tabBadge]="pendingLength"
			tabBadgeStyle="danger"></ion-tab>
		<ion-tab [root]="clubsTabRoot" tabIcon="flag"></ion-tab>
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
	private clubsTabRoot: any;
	private pendingLength: number;
	private statusLengthsSub: Subscription;

	constructor(
		private userSvc: UserSvc,
		private chatSvc: ChatSvc,
		private statusLengthsSvc: StatusLengthsSvc
	) {
		this.profileTabRoot = ProfileMenuCom;
		this.rankingsTabRoot = RankingsCom;
		this.chatsTabRoot = MessageListCom;
		this.clubsTabRoot = ClubsCom;
	}

	ngOnInit(){
		this.statusLengthsSub = this.statusLengthsSvc
			.$({ _id: this.userSvc.current._id, by: USER })
			.subscribe(({pending}) => this.pendingLength = pending);
	}

	ngOnDestroy(){
		this.statusLengthsSub.unsubscribe();
	}
}
