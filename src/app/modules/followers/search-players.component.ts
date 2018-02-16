import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfileMainCom } from '../profile-main/profile-main.component';
import { UserInt } from '../user-service/user.interface';
import { debounce } from 'lodash';
import { UserSvc } from '../user-service/user.service';
import { ModelSvc, USER } from '../model-service/model.service';

@Component({
	selector: 'search',
	template:
  `
  <ion-header>
  	<ion-navbar>
  		<ion-title>Search players</ion-title>
  	</ion-navbar>
  </ion-header>

  <ion-content>
    <ion-toolbar primary>
  		<ion-searchbar
  			(ionInput)="searchPlayers($event)"
  			debounce="400"
  		></ion-searchbar>
  	</ion-toolbar>

  	<ion-list>
  		<button ion-item
  			*ngFor="let user of playersCollection.$ | async"
  			(click)="openProfile(user)"
  		>
				<ion-avatar item-left>
					<loading-img [src]="(user.$ | async)?.details.image"></loading-img>
				</ion-avatar>
  			{{ (user.$ | async)?.details.fullName }}
  		</button>
  	</ion-list>
  </ion-content>
  `
})
export class SearchPlayersCom {

	private playersCollection: any;

	constructor(
		private nav: NavController,
		private userSvc: UserSvc,
		private modelSvc: ModelSvc
	){
		this.playersCollection = this.modelSvc.createCollection(USER);
	}

	openProfile(user){
		this.nav.push(ProfileMainCom, { user });
	}

  searchPlayers({target: { value }}){
    this.userSvc.search(value)
			.subscribe(users => this.playersCollection.update(users));
  }

	ngOnDestroy(){
		this.playersCollection.destroy();
	}

}
