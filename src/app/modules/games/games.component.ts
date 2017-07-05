import { Component, Input } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import { GameModel } from './game.model';
import { GamesSvc } from './games.service';


@Component({
  selector: 'games',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Games</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content>

    <ion-segment (ionChange)="getByStatus()" [(ngModel)]="selectedSegment">
      <ion-segment-button [disabled]="lengths.pending === 0" value="pending">
        Pending ({{lengths.pending}})
      </ion-segment-button>
      <ion-segment-button [disabled]="lengths.accepted === 0" value="accepted">
        Upcoming ({{lengths.accepted}})
      </ion-segment-button>
      <ion-segment-button [disabled]="(lengths.played + lengths.rejected + lengths.forfeit) === 0" value="played,rejected,forfeit">
        Previous ({{(lengths.played + lengths.rejected + lengths.forfeit)}})
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
export class GamesCom {

  private userId: string;
  private gamesListSubject: Subject<Array<GameModel>> = new Subject();
  private gamesList$: Observable<any> = this.gamesListSubject.asObservable();
  private selectedSegment = "pending";
  private lengths: Object = {};

  constructor(
    private gamesSvc: GamesSvc,
    private navParams: NavParams,
    private loadingCtrl: LoadingController
  ){
    this.userId = this.navParams.get("_id");
    this.gamesSvc.lengths$.subscribe(lengths => this.lengths = lengths);
    this.getByStatus();
  }

  getByStatus(){
    let loading = this.loadingCtrl.create({
      content: 'Loading games...',
      showBackdrop: false
    });

    loading.present();

    this.gamesSvc.getByStatus(this.userId, this.selectedSegment)
      .subscribe(games => {
        this.gamesListSubject.next(games);
        loading.dismiss();
      });
  }

}
