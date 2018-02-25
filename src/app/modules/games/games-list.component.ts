import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameInt } from './games.interfaces';

@Component({
  selector: 'games-list',
  template: `
  <no-data-message *ngIf="gamesList.length === 0">
    No games to show yet, try challenging someone.
  </no-data-message>
  <ion-list *ngIf="gamesList.length > 0">
    <game-card
      *ngFor="let gameModel of gamesList; trackById"
      [gameModel]="gameModel"
    ></game-card>
  </ion-list>
  <ion-infinite-scroll (ionInfinite)="ionInfinite.emit($event)" threshold="75%">
    <ion-infinite-scroll-content></ion-infinite-scroll-content>
  </ion-infinite-scroll>
  `
})
export class GamesListCom {
  @Output() ionInfinite = new EventEmitter();
  @Input() gamesList: Array<GameInt> = [];
  trackById(index, { _id }){
    return _id;
  }
}
