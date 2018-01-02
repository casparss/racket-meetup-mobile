import { Component, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { NavParams } from 'ionic-angular';
import { UserSvc, UserInt } from '../user-service/user.service';
import { UserModel } from '../user-service/user.model';

@Component({
	template:
	`
		<ion-header>
		  <ion-navbar>
				<ion-title>Profile</ion-title>
		  </ion-navbar>
		</ion-header>

		<ion-content no-bounce>
			<div class="content-background">
				<profile-header
					[user]="user"
					[isCurrentUser]="isCurrentUser"
				></profile-header>

				<profile-actions
					[userModel]="user"
				></profile-actions>

				<main [ngSwitch]="isCurrentUser">

					<availability
						*ngSwitchCase="true"
						[user]="user"
					></availability>

					<games-summary [user]="user"></games-summary>
				</main>
			</div>
		</ion-content>
	`,
	selector:'profile-main'
})
export class ProfileMainCom{

	private user: UserModel;
	private isCurrentUser: boolean;

	constructor(
		private userSvc: UserSvc,
		private params: NavParams,
		private nav: NavController
	){}

	ngOnInit(){
		this.setUser();
	}

	setUser(){
		let id: string = this.params.get("id");
		let user: UserModel = this.params.get("user");

		if(id){
			this.userSvc.fetchUserById(id)
				.subscribe(user => this.user = user);
		}
		else if(user){
			this.user = user;
		}
		else {
			this.isCurrentUser = true;
			this.user = this.userSvc.current;
		}
	}

}
