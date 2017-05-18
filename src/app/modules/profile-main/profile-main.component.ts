import {Component, EventEmitter} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {ProfileMainSvc} from './profile-main.service';
import {UserSvc, UserInt} from '../user-service/user.service';

@Component({
	template:
	`
		<ion-header>
			<ion-navbar>
				<ion-title>{{user.details.fullName}}</ion-title>
			</ion-navbar>
		</ion-header>

		<ion-content>

			<profile-header [user]="user"></profile-header>

			<profile-actions
				[user]="user"
			></profile-actions>

			<main [ngSwitch]="user?.id === userSvc?.current.id">

				<availability
					*ngSwitchCase="true"
					[user]="user"
				></availability>

				<games [user]="user"></games>

			</main>

		</ion-content>
	`,
	selector:'profile-main'
})
export class ProfileMainCom{

	private user: UserInt;

	constructor(
		private profileSvc: ProfileMainSvc,
		private userSvc: UserSvc,
		private params: NavParams
	){}

	ngOnInit(){
		this.loadUser();
	}

	loadUser(){

		//@#Refactor:10 convert everything to use observables - just worked out how to do objs properly

		let id: string = this.params.get("id");
		let user: UserInt = this.params.get("user");

		if(id){
			this.profileSvc.get(id).subscribe(user => this.user = user);
		}
		else if(user){
			this.user = user;
		}
		else {
			this.user = this.userSvc.current;
		}

	}

}
