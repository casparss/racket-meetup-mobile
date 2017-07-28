import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { UserModel } from '../user-service/user.model';
import { toPromise } from '../../utils/util-helpers';

import { GamesSvc } from '../games/games.service';
import { ChallengeCom } from '../challenge/challenge.component';
import { ProfileMainSvc } from './profile-main.service';
import { UserSvc, UserInt } from '../user-service/user.service';
import { MessagesSvc } from '../messages/messages.service';
import { MydetailsCom } from '../my-details/my-details.component';
import { FollowersCom } from '../followers/followers.component';
import { SearchPlayersCom } from '../followers/search-players.component';
import { ChatCom } from '../messages/chat.component';
import { GamesCom } from '../games/games.component';

@Component({
	selector:'profile-actions',
	template:`
		<ion-list [ngSwitch]="userModel._id === userSvc.current.user._id">
			<ion-list-header class="component-header">
				Actions
			</ion-list-header>

			<button *ngSwitchCase="false" type="button" ion-item (click)="challengePlayer()">
				<ion-icon name="medal" item-left></ion-icon>
				Challenge player
			</button>

			<button *ngSwitchCase="false" ion-item (click)="messagePlayer()">
				<ion-icon name="mail" item-left></ion-icon>
				Message player
			</button>

			<button (click)='openGames()' ion-item>
				<ion-icon name="tennisball" item-left></ion-icon>
				Games
				<ion-badge *ngIf="pending > 0" item-end color="danger">{{pending}}</ion-badge>
				<ion-badge *ngIf="accepted > 0" item-end>{{accepted}}</ion-badge>
			</button>

			<button *ngSwitchCase="false" ion-item (click)="toggleFollow()" [ngSwitch]="isFriend">
				<ion-icon *ngSwitchCase="false" name="add" item-left></ion-icon>
				<ion-icon *ngSwitchCase="true" name="remove" item-left></ion-icon>
				{{isFriend ? "Remove" : "Add"}} player as friend
			</button>

			<button *ngSwitchCase="true" (click)="openFollowers()" ion-item>
				<ion-icon name="people" item-left></ion-icon>
				Followers
			</button>
		</ion-list>
	`
})
export class ProfileActionsCom {

	@Input() userModel: UserModel;
	private isFriend: boolean = false;
	private pending: number;
	private accepted: number;

	constructor(
		private nav: NavController,
		private modalController : ModalController,
		private userSvc: UserSvc,
    private messagesSvc: MessagesSvc,
		private gamesSvc: GamesSvc
	){
		this.setIsFriend();
	}

	ngOnInit(){
		this.userModel.statusLengths$.subscribe(({pending, accepted}) => {
			this.pending = pending;
			this.accepted = accepted;
		});
	}

  setIsFriend(){
		if(this.userModel) this.isFriend = this.userSvc.doesFollow(this.userModel._id);
  }

	challengePlayer(){
		let challengeModal = this.modalController.create(ChallengeCom, {
			user: this.userModel
		});

		challengeModal.present(challengeModal);
	}

	messagePlayer(){
		this.messagesSvc.getChat([this.userModel._id])
      .subscribe(chat => this.nav.push(ChatCom, { chat }));
	}

	toggleFollow(){
		this.userSvc.toggleFollow(this.userModel._id)
			.subscribe(isFriend => this.isFriend = isFriend);
	}

	openFollowers(): void {
		this.nav.push(FollowersCom);
	}

	openGames(): void {
		this.nav.push(GamesCom, { user: this.userModel })
	}

  ngOnChanges(){
    this.setIsFriend();
  }

}
