import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameInt } from './games.interfaces';

@Component({
  selector: 'games-list',
  template: `
  <no-data-message *ngIf="gamesList.length === 0">
    No games to show yet, try challenging someone.
  </no-data-message>
  <ion-list *ngIf="gamesList.length > 0">
    <ng-container *ngFor="let gameModel of gamesList; trackById">
      <ng-container [ngSwitch]="selectedSegment">
        <game-card-full
          *ngSwitchDefault
          [gameModel]="gameModel"
        ></game-card-full>

        <game-card-previous
          *ngSwitchCase="'played,rejected,forfeit'"
          [gameModel]="gameModel"
        ></game-card-previous>
      </ng-container>
    </ng-container>
  </ion-list>
  <ion-infinite-scroll (ionInfinite)="ionInfinite.emit($event)" threshold="75%">
    <ion-infinite-scroll-content></ion-infinite-scroll-content>
  </ion-infinite-scroll>
  `
})
export class GamesListCom {
  @Output()
  ionInfinite = new EventEmitter();

  @Input()
  gamesList: Array<GameInt> = [];

  @Input()
  selectedSegment: string;

  trackById(index, { _id }){
    return _id;
  }
}
