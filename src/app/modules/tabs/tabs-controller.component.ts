import { Component } from '@angular/core'
import { ProfileMainCom } from '../profile-main/profile-main.component';
import { RankingsListCom } from '../rankings-list/rankings-list.component';
import { MessageListCom } from '../messages/message-list.component';
import { UserSvc } from '../user-service';

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
		<ion-tab [root]="messagesTabRoot" tabTitle="Messages" tabIcon="filing"></ion-tab>
	</ion-tabs>
	`
})
export class TabsController {
	private profileTabRoot: any;
	private rankingsTabRoot: any
	private messagesTabRoot: any;
	private pendingLength: number;

	constructor(private userSvc: UserSvc) {
		this.profileTabRoot = ProfileMainCom;
		this.rankingsTabRoot = RankingsListCom;
		this.messagesTabRoot = MessageListCom;
	}

	ngOnInit(){
		this.userSvc.current.statusLengths$.subscribe(statuses => {
			let { pending, accepted } = statuses;
			this.pendingLength = pending;
			//this.accepted = accepted;
		});
	}
}
