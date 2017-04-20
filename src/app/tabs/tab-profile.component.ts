import {Component} from '@angular/core';

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
	`
})
export class ProfileTab {
	constructor() {}
};
