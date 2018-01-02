import { Component, Input } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { GameModel } from './game.model';
import { UserSvc } from '../user-service/user.service';
import { GamesSvc } from './games.service';
import { findKey, once } from 'lodash';
import { ModelSvc, GAME } from '../model-service/model.service';

@Component({
  selector: 'games',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Games</ion-title>
    </ion-navbar>
    <ion-segment *ngIf="!isEmptyState()" (ionChange)="getByStatus()" [(ngModel)]="selectedSegment">

      <ion-segment-button [disabled]="lengths.pending === 0" value="pending">
        Pending
        <span
          *ngIf="lengths.pending === 0 || selectedSegment === 'pending'; else pending"
        >({{lengths.pending}})</span>
        <ng-template #pending>
          <ion-badge
            item-end
            color="danger"
          >{{lengths.pending}}</ion-badge>
        </ng-template>
      </ion-segment-button>

      <ion-segment-button [disabled]="lengths.accepted === 0" value="accepted">
        Upcoming
        <span
          *ngIf="lengths.accepted === 0 || selectedSegment === 'accepted'; else accepted"
        >({{lengths.accepted}})</span>
        <ng-template #accepted>
          <ion-badge item-end>{{lengths.accepted}}</ion-badge>
        </ng-template>
      </ion-segment-button>

      <ion-segment-button [disabled]="(lengths.played + lengths.rejected + lengths.forfeit) === 0" value="played,rejected,forfeit">
        Previous ({{(lengths.played + lengths.rejected + lengths.forfeit)}})
      </ion-segment-button>

    </ion-segment>
  </ion-header>

  <ion-content>



    <no-data-message *ngIf="isEmptyState()">No games to show yet, try challenging someone.</no-data-message>

    <ion-list *ngIf="!isEmptyState()">
      <game-card
        *ngFor="let gameModel of (gamesListCollection.$ | async); trackById"
        [gameModel]="gameModel"
      ></game-card>
    </ion-list>
    <ion-infinite-scroll (ionInfinite)="lazyLoad($event)">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>

  </ion-content>
  `
})
export class GamesCom {

  private user: any;
  private requestedTab: any;
  private gamesListSubject: Subject<Array<GameModel>> = new Subject();
  private gamesList$: Observable<any> = this.gamesListSubject.asObservable();
  private gamesListCollection: any;
  private selectedSegment = "pending";
  private lengths: any = {};
  private statusLengthsSub: Subscription;
  private lazyLoadLimit: number = 2;
  private lastSeenId: string;

  constructor(
    private gamesSvc: GamesSvc,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private userSvc: UserSvc,
    private modelSvc: ModelSvc
  ){
    this.user = this.navParams.get("user") || this.userSvc.current;
    this.requestedTab = this.navParams.get("requestedTab");
    this.gamesListCollection = this.modelSvc.createCollection(GAME);
  }

  ngOnInit(){
    this.statusLengthsSub = this.user.statusLengths$.subscribe(lengths => {
      this.lengths = lengths;
      this.tabSelection();
    });
  }

  private tabSelection = once(() => {
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
  });

  isEmptyState(){
    return this.selectedSegment === "";
  }

  getByStatus(){
    this.lastSeenId = null;

    let loading = this.loadingCtrl.create({
      content: 'Loading games...',
      showBackdrop: false
    });

    loading.present();

    this.gamesSvc.getByStatus({
      _id: this.user.user._id,
      status: this.selectedSegment,
      limit: this.lazyLoadLimit
    })
    .subscribe(({games}) => {
      this.gamesListCollection.update(games);
      loading.dismiss();
    });
  }


  lazyLoad(nScroll){
    let lastSeenId = this.gamesListCollection.last()._id;
    if (this.lastSeenId === lastSeenId) return nScroll.complete();
    this.lastSeenId = lastSeenId;

    this.gamesSvc.getByStatus({
      _id: this.user.user._id,
      status: this.selectedSegment,
      limit: this.lazyLoadLimit,
      lastSeenId
    })
    .subscribe(({games}) => {
      this.gamesListCollection.push(games);
      nScroll.complete();
    });
  }

  trackById(index, { _id }){
    return _id;
  }

  ngOnDestroy(){
    this.gamesListCollection.destroy();
    this.statusLengthsSub.unsubscribe();
  }

}
