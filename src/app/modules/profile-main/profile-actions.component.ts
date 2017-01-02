import {Component, Input} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {ChallengeCom} from '../challenge/challenge.component';
import {ProfileMainSvc} from './profile-main.service';
import {UserSvc, UserInt} from '../user-service/user.service';

import {SearchPlayersCom} from '../followers/search-players.component'

import {ProfileMainCom} from '../profile-main/profile-main.component';
import {MydetailsCom} from '../my-details/my-details.component';
import {FollowersCom} from '../followers/followers.component';

const pages: any = {
	myDetails: MydetailsCom,
	followers: FollowersCom,
  searchPlayers: SearchPlayersCom
};

@Component({
	selector:'profile-actions',
	template:`
		<ion-list [ngSwitch]="user.id === userSvc.current.id">

			<ion-list-header>
				Actions
			</ion-list-header>

			<button *ngSwitchCase="false" ion-item (click)="challengePlayer()">
				<ion-icon name="tennisball" item-left></ion-icon>
				Challenge player
			</button>

			<button *ngSwitchCase="false" ion-item (click)="messagePlayer()">
				<ion-icon name="mail" item-left></ion-icon>
				Message player
			</button>

			<button *ngSwitchCase="false" ion-item (click)="toggleFollow()" [ngSwitch]="isFriend">
				<ion-icon *ngSwitchCase="false" name="add" item-left></ion-icon>
				<ion-icon *ngSwitchCase="true" name="remove" item-left></ion-icon>
				{{isFriend ? "Remove" : "Add"}} player as friend
			</button>

			<button *ngSwitchCase="true" (click)="openPage('followers')" ion-item>
				<ion-icon name="people" item-left></ion-icon>
				Followers
			</button>

      <button *ngSwitchCase="true" (click)="openPage('searchPlayers')" ion-item>
				<ion-icon name="search" item-left></ion-icon>
				Search
			</button>

			<button *ngSwitchCase="true" (click)="openPage('myDetails')" ion-item>
				<ion-icon name="trophy" item-left></ion-icon>
				My details
			</button>

		</ion-list>
	`
})
export class ProfileActionsCom{

	@Input() user: UserInt;
	private isFriend: boolean = false;

	constructor(
		private nav: NavController,
		private profileSvc: ProfileMainSvc,
		private modalController : ModalController,
		private userSvc: UserSvc
	){
     this.setIsFriend();
  }

  setIsFriend(){
    if(this.user) this.isFriend = this.userSvc.doesFollow(this.user);
  }

	challengePlayer(){
		let challengeModal = this.modalController.create(ChallengeCom, {
			user: this.user
		});

		challengeModal.present(challengeModal);
	}

  searchPlayers(){

  }

	messagePlayer(){
		//Open message player modal
	}

	toggleFollow(){
    this.userSvc.toggleFollow(this.user._id)
      .subscribe(data => this.isFriend = data.isFriend);
	}

	openPage(pageName: string): void{
		this.nav.push(pages[pageName]);
	}

  ngOnChanges(){
    this.setIsFriend();
  }

}
