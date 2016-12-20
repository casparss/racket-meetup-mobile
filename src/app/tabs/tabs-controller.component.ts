import {Component} from '@angular/core'
import {GamesTab} from './tab-games.component';
import {ProfileTab} from './tab-profile.component';
import {CourtsTab} from './tab-courts.component';
import {RankingsTab} from './tab-rankings.component';
import {MessagesTab} from './tab-messages.component';

@Component({
	template:
	`
	<ion-tabs tabbarPlacement="bottom" tabbarLayout="icon-top">
		<!-- <ion-tab [root]="gamesTabRoot" tabBadge="2" tabBadgeStyle="danger" tabTitle="Games" tabIcon="home"></ion-tab> -->
		<ion-tab [root]="profileTabRoot" tabTitle="Profile" tabIcon="person"></ion-tab>
		<!-- <ion-tab [root]="courtsTabRoot" tabTitle="Courts" tabIcon="navigate"></ion-tab> -->
		<ion-tab [root]="rankingsTabRoot" tabTitle="Rankings" tabIcon="trophy"></ion-tab>
		<ion-tab [root]="messagesTabRoot" tabBadge="15" tabBadgeStyle="danger" tabTitle="Messages" tabIcon="filing"></ion-tab>
	</ion-tabs>
	<toast></toast>
	`
})
export class TabsPageCom {

	private gamesTabRoot: any;
	private profileTabRoot: any;
	private courtsTabRoot: any;
	private rankingsTabRoot: any
	private messagesTabRoot: any;

	constructor() {
		// this tells the tabs component which Pages
		// should be each tab's root Page
		this.gamesTabRoot = GamesTab;
		this.profileTabRoot = ProfileTab;
		this.courtsTabRoot = CourtsTab;
		this.rankingsTabRoot = RankingsTab;
		this.messagesTabRoot = MessagesTab;

	}
}
