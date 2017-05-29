import {Component, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import {NavParams} from 'ionic-angular';
import {ProfileMainSvc} from './profile-main.service';
import {UserSvc, UserInt} from '../user-service/user.service';

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
					[user]="user"
				></profile-actions>

				<main [ngSwitch]="isCurrentUser">

					<availability
						*ngSwitchCase="true"
						[user]="user"
					></availability>

					<games [user]="user"></games>

				</main>

			</div>

		</ion-content>
	`,
	selector:'profile-main'
})
export class ProfileMainCom{

	private user: Observable<UserInt>;
	private isCurrentUser: boolean;

	constructor(
		private profileSvc: ProfileMainSvc,
		private userSvc: UserSvc,
		private params: NavParams
	){}

	ngOnInit(){
		this.loadUser();
	}

	loadUser(){
		let id: string = this.params.get("id");
		let user: Observable<UserInt> = this.params.get("user");

		if(id){
			this.user = this.profileSvc.get(id);
		}
		else if(user){
			this.user = user;
		}
		else {
			this.isCurrentUser = true;
			this.user = this.userSvc.current$;
		}
	}

}
