import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
	template:
	`
	<ion-header>
    <ion-navbar>
      <ion-title>Rankings</ion-title>
    </ion-navbar>
  </ion-header>
	<ion-content class="rankings-tab">
		<rankings-list></rankings-list>
	</ion-content>
	`
})
export class RankingsTab {}
