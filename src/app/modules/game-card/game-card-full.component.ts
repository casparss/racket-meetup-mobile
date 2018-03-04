import { Component, Input } from '@angular/core';
import { GameCardBaseCom } from './game-card-base.component';

@Component({
	selector: 'game-card-full',
	template:`
		<ion-card [attr.status]="game.status">
			<card-el-title [gameModel]="gameModel"></card-el-title>
		  <games-banner [gameModel]="gameModel"></games-banner>

			<ion-item-group>
				<card-el-club-name [gameModel]="gameModel"></card-el-club-name>
				<card-el-date-time [gameModel]="gameModel"></card-el-date-time>
		  </ion-item-group>

			<card-el-buttons [gameModel]="gameModel"></card-el-buttons>
		</ion-card>
  `
})
export class GameCardFullCom extends GameCardBaseCom {}
