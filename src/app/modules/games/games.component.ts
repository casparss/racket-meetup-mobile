import { Component, Input } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import { GameModel } from './game.model';
import { GamesSvc } from './games.service';
import { findKey, once } from 'lodash';


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

  private user: any;
  private gamesListSubject: Subject<Array<GameModel>> = new Subject();
  private gamesList$: Observable<any> = this.gamesListSubject.asObservable();
  private selectedSegment = "pending";
  private lengths: any = {};
  private showEmptyState: boolean = false;
  private firstLoad: boolean = true;

  constructor(
    private gamesSvc: GamesSvc,
    private navParams: NavParams,
    private loadingCtrl: LoadingController
  ){
    this.user = this.navParams.get("user");
  }

  ngOnInit(){
    this.user.statusLengths$.subscribe(lengths => {
      this.lengths = lengths;
      this.tabSelectionOnce();
    });
  }

  initialTabSelection(){
      let { pending, accepted, played, rejected, forfeit } = this.lengths;
      let isLengths = () => !findKey(this.lengths, length => length > 0);

      if(isLengths()){
        this.showEmptyState = true;
        this.selectedSegment = "";
      } else if(pending > 0){
        this.selectedSegment = 'pending';
      } else if(accepted > 0){
        this.selectedSegment = 'accepted';
      } else {
        this.selectedSegment = 'played,rejected,forfeit';
      }

      this.getByStatus();
  }

  private tabSelectionOnce = once(this.initialTabSelection);

  getByStatus(){
    let loading = this.loadingCtrl.create({
      content: 'Loading games...',
      showBackdrop: false
    });

    loading.present();

    this.gamesSvc.getByStatus(this.user.user._id, this.selectedSegment)
      .subscribe(games => {
        this.gamesListSubject.next(games);
        loading.dismiss();
      });
  }

}
