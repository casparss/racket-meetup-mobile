import { Component, Input } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import { GameModel } from './game.model';
import { UserSvc } from '../user-service/user.service';
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

    <div *ngIf="isEmptyState()">No games yet</div>

    <ion-list *ngIf="!isEmptyState()">
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
  private requestedTab: any;
  private gamesListSubject: Subject<Array<GameModel>> = new Subject();
  private gamesList$: Observable<any> = this.gamesListSubject.asObservable();
  private selectedSegment = "pending";
  private lengths: any = {};
  private showEmptyState: boolean = false;
  private firstLoad: boolean = true;

  constructor(
    private gamesSvc: GamesSvc,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private userSvc: UserSvc
  ){
    this.user = this.navParams.get("user") || this.userSvc.current;
    this.requestedTab = this.navParams.get("requestedTab");
  }

  ngOnInit(){
    this.user.statusLengths$.subscribe(lengths => {
      this.lengths = lengths;
      this.tabSelectionOnce();
    });
  }

  initialTabSelection(){
      let { pending, accepted, played, rejected, forfeit } = this.lengths;
      let areLengthsEmpty = () => !findKey(this.lengths, length => length > 0);

      if(areLengthsEmpty()){
        this.selectedSegment = "";
      } else if(this.requestedTab){
        this.selectedSegment = this.requestedTab;
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

  isEmptyState(){
    return this.selectedSegment === "";
  }

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
