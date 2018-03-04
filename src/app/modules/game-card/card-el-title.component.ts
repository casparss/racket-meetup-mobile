import { Component, Input } from '@angular/core';
import { GameCardBaseCom } from './game-card-base.component';

@Component({
	selector: 'card-el-title',
	template:`
  <ion-item>
    <ion-icon
      name="tennisball" [color]="ballState(game)" item-left large></ion-icon>
    <h2 item-left>
      {{getTitle(game)}}
      <span
        class="status-text"
        [attr.status]="game.status"
        *ngIf="status(game, ['rejected', 'forfeit', 'played'])"
      >
        {{getStatus(game)}}
      </span>
    </h2>
    <button
      ion-button
      icon-left
      item-right
      outline
      (click)="viewGameDetails(game)"
      *ngIf="status(game, ['accepted', 'played'])">
      <ion-icon name="more"></ion-icon>
      View game
    </button>
  </ion-item>
  `
})
export class CardElTitleCom extends GameCardBaseCom {}
