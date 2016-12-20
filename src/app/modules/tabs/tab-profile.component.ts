import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfileMainCom} from '../../modules/profile-main/profile-main.component';

@Component({
	template:
	`
	<ion-header>
	<ion-navbar>
		<ion-title>Profile</ion-title>
	</ion-navbar>
	</ion-header>

	<ion-content class="profile-tab">
		<profile-main></profile-main>
	</ion-content>
	`,
	directives:[ProfileMainCom]
})
export class ProfileTab {
	constructor(private navController: NavController) {}
};
