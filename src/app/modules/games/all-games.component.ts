import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import { GameModel } from './game.model';
import { GamesSvc } from './games.service';

@Component({
  selector: 'all-games',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Games</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content>

    <ion-segment [(ngModel)]="selectedSegment">
      <ion-segment-button value="pending">
        Pending
      </ion-segment-button>
      <ion-segment-button value="upcoming">
        Upcoming
      </ion-segment-button>
      <ion-segment-button value="previous">
        Previous
      </ion-segment-button>
      <ion-segment-button value="cancelled">
        Cancelled
      </ion-segment-button>
    </ion-segment>

    <ion-list>
      <game-card
        *ngFor="let gameModel of gamesList$ | async"
        [gameModel]="gameModel"
      ></game-card>
    </ion-list>

  </ion-content>
  `
})
export class AllGamesCom {

  private userId: string;
  private gamesListSubject: Subject<Array<GameModel>> = new Subject();
  private gamesList$: Observable<any> = this.gamesListSubject.asObservable();
  private selectedSegment = "upcoming";

  constructor(
    private gamesSvc: GamesSvc,
    private navParams: NavParams
  ){
    this.userId = this.navParams.get("_id");
    this.getBySegment();
  }

  getBySegment(){
    this.gamesSvc.get(this.userId)
      .subscribe((games: any) => this.gamesListSubject.next(games));
  }

}
