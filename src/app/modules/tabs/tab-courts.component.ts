import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  template:
	`
	<ion-header>
		<ion-navbar>
			<ion-title>Courts</ion-title>
		</ion-navbar>
	</ion-header>

	<ion-content class="courts-tab"></ion-content>
	`
})
export class CourtsTab {
  constructor(private navController: NavController) {
  
  }
};
