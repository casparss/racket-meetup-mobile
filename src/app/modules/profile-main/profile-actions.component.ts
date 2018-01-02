import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController, ModalController } from 'ionic-angular';
import { UserModel } from '../user-service/user.model';

import { GamesSvc } from '../games/games.service';
import { ChallengeCom } from '../challenge/challenge.component';
import { UserSvc } from '../user-service/user.service';
import { ChatSvc } from '../chat/chat.service';
import { FollowersCom } from '../followers/followers.component';
import { ChatCom } from '../chat/chat.component';
import { GamesCom } from '../games/games.component';
import { ModelSvc } from '../model-service/model.service';

@Component({
	selector:'profile-actions',
	template:`
		<ion-list *ngIf="userModel._id !== userSvc.current.user._id">
			<ion-list-header class="component-header">
				Actions
			</ion-list-header>

			<button type="button" ion-item (click)="challengePlayer()">
				<ion-icon name="medal" item-left></ion-icon>
				Challenge player
			</button>

			<button ion-item (click)="messagePlayer()">
				<ion-icon name="mail" item-left></ion-icon>
				Message player
			</button>

			<button (click)='openGames()' ion-item>
				<ion-icon name="tennisball" item-left></ion-icon>
				Games
				<ion-badge *ngIf="pending > 0" item-end color="danger">{{pending}}</ion-badge>
				<ion-badge *ngIf="accepted > 0" item-end>{{accepted}}</ion-badge>
			</button>

			<button ion-item detail-none [ngSwitch]="isFriend" (click)="toggleFollow()">
				<ion-icon *ngSwitchCase="false" name="add" item-left></ion-icon>
				<ion-icon *ngSwitchCase="true" name="remove" item-left></ion-icon>
				{{isFriend ? "Unfollow" : "Follow"}} player
			</button>
		</ion-list>
	`
})
export class ProfileActionsCom {

	@Input() userModel: UserModel;
	private isFriend: boolean = false;
	private pending: number;
	private accepted: number;
	private statusLengthsSub: Subscription;

	constructor(
		private nav: NavController,
		private modalController : ModalController,
		private userSvc: UserSvc,
    private chatSvc: ChatSvc,
		private gamesSvc: GamesSvc,
		private modelSvc: ModelSvc
	){
		this.setIsFriend();
	}

	ngOnInit(){
		this.statusLengthsSub = this.userModel.statusLengths$.subscribe(({pending, accepted}) => {
			this.pending = pending;
			this.accepted = accepted;
		});
	}

	ionViewDidUnload(){
		this.statusLengthsSub.unsubscribe();
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
		this.chatSvc.getChat([this.userModel._id])
			.subscribe(chat => this.nav.push(ChatCom, {
				chatModel: this.modelSvc.create(chat, null, {
					currentUser_id: this.userSvc.current._id
				})
			}));
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
