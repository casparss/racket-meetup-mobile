import { Component, Input } from '@angular/core';
import { GameCardBaseCom } from './game-card-base.component';

@Component({
	selector: 'card-el-date-time',
	template:`
  <ion-item>
    <ion-icon item-left large name="clock"></ion-icon>
    <h2>{{game.date | date :'shortTime'}}</h2>
    <p>{{game.date | date : 'EEEE, d/M/y'}}</p>
  </ion-item>
  `
})
export class CardElDateTimeCom extends GameCardBaseCom {}
