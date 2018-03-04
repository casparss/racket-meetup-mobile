import { Component } from '@angular/core';
import { GameCardBaseCom } from './game-card-base.component';

@Component({
	selector: 'card-el-score',
	template:`
  <ion-item>
    <score-line game-card [gameModel]="gameModel" side="1" [status]="game.status"></score-line>
  </ion-item>
  <ion-item>
    <score-line game-card [gameModel]="gameModel" side="2" [status]="game.status"></score-line>
  </ion-item>
  `
})
export class CardElScoreCom extends GameCardBaseCom {}
