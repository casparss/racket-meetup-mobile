import { Component, Input } from '@angular/core';
import { GameCardBaseCom } from './game-card-base.component';

@Component({
	selector: 'card-el-club-name',
	template:`
	<ion-item>
		<ion-icon name="pin" item-left large ></ion-icon>
		<h2>{{game.club.name}}</h2>
	</ion-item>
  `
})
export class CardElClubNameCom extends GameCardBaseCom {}
