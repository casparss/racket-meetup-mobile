import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfileMainCom} from '../profile-main/profile-main.component';
import {UserInt} from '../user-service/user.interface';
import {debounce} from 'lodash';
import {UserSvc} from '../user-service/user.service';

@Component({
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
  		<ion-item
  			*ngFor="let user of userSvc.searchedPlayers$ | async"
  			(click)="openProfile(user)"
  		>
  			{{ user?.details.firstName + " " + user?.details.lastName }}
  		</ion-item>
  	</ion-list>

  </ion-content>

  `
})
export class SearchPlayersCom{

	private userList$: any;

	constructor(
		private nav: NavController,
		private userSvc: UserSvc
	){}

	openProfile(user){
		this.nav.push(ProfileMainCom, {user: user});
	}

  searchPlayers(ev){
    this.userSvc.search(ev.target.value);
  }

}
