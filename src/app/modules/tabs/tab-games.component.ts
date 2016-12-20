import {Component} from '@angular/core';
import {AvailabilityCom} from '../../modules/availability/availability.component'
import {GamesCom} from '../../modules/games/games.component';

@Component({
	template:
	`
	<ion-header>
	<ion-navbar>
		<ion-title>Games</ion-title>
	</ion-navbar>
	</ion-header>

	<ion-content class="games-tab"></ion-content>
	`,
	directives:[AvailabilityCom, GamesCom]
})
export class GamesTab {
	constructor() {}
};