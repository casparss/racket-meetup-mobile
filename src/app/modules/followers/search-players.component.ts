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

  	<player-list [playerList$]="playerCollection.$"></player-list>
  </ion-content>
  `
})
export class SearchPlayersCom {

	private playerCollection: any;

	constructor(
		private nav: NavController,
		private userSvc: UserSvc,
		private modelSvc: ModelSvc
	){
		this.playerCollection = this.modelSvc.createCollection(USER);
	}

	openProfile(user){
		this.nav.push(ProfileMainCom, { user });
	}

  searchPlayers({target: { value }}){
    this.userSvc.search(value)
			.subscribe(users => this.playerCollection.update(users));
  }

	ngOnDestroy(){
		this.playerCollection.destroy();
	}

}
