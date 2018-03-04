import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController, ModalController } from 'ionic-angular';
import { UserModel } from '../user-service/user.model';
import { GamesSvc, lengthsInt } from '../games/games.service';
import { ChallengeCom } from '../challenge/challenge.component';
import { UserSvc } from '../user-service/user.service';
import { ChatSvc } from '../chat/chat.service';
import { FollowersCom } from '../followers/followers.component';
import { ChatCom } from '../chat/chat.component';
import { GamesCom } from '../games/games.component';
import { ModelSvc, USER } from '../model-service/model.service';
import { StatusLengthsSvc } from '../games/status-lengths.service';

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
				<ion-badge *ngIf="showPendingBadge" item-end color="danger">{{lengths?.pending}}</ion-badge>
				<ion-badge *ngIf="(lengths?.accepted) > 0" item-end>{{lengths?.accepted}}</ion-badge>
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
	private lengths: lengthsInt;
	private statusLengthsSub: Subscription;

	constructor(
		private nav: NavController,
		private modalController : ModalController,
		private userSvc: UserSvc,
    private chatSvc: ChatSvc,
		private gamesSvc: GamesSvc,
		private modelSvc: ModelSvc,
		private statusLengthsSvc: StatusLengthsSvc
	){
		this.setIsFriend();
	}

	ngOnInit(){
		this.statusLengthsSub = this.statusLengthsSvc
			.$({ _id: this.userModel._id, by: USER })
			.subscribe(lengths => this.lengths = lengths);
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
		this.nav.push(GamesCom, {
			model: this.userModel,
			lengths: this.lengths
		 })
	}

  ngOnChanges(){
    this.setIsFriend();
  }

	get showPendingBadge(){
		return (
			this.userSvc.isCurrentUser(this.userModel._id) &&
			this.lengths.pending > 0
		)
	}
}
