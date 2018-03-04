import { Component, Input } from '@angular/core';
import { GameCardBaseCom } from './game-card-base.component';

@Component({
	selector: 'card-el-buttons',
	template:`
  <div *ngIf="status(game, ['pending']) && !isAccepted()" class="button-group">
    <button ion-button icon-left clear small color="textGrey" (click)="acceptChallenge(game)">
      <ion-icon name="thumbs-up" color="primary"></ion-icon>
      Accept
    </button>

    <button ion-button icon-left clear small color="textGrey" (click)="rejectChallenge(game)">
      <ion-icon name="close-circle" color="danger"></ion-icon>
      Reject
    </button>
  </div>

  <div *ngIf="status(game, ['pending']) && isAccepted()" class="button-group single">
    <button ion-button icon-left clear small (click)="rejectChallenge(game)">
      <ion-icon name="close-circle" color="danger"></ion-icon>
      Cancel match request
    </button>
  </div>
  `
})
export class CardElButtonsCom extends GameCardBaseCom {}
