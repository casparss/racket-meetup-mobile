import { Component, Input } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { GameModel } from './game.model';
import { UserSvc } from '../user-service/user.service';
import { GamesSvc } from './games.service';
import { ModelSvc, isModelType, USER, CLUB, GAME } from '../model-service/model.service';

@Component({
  selector: 'games',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Games</ion-title>
    </ion-navbar>
    <games-segment
      [requestedTab]="requestedTab"
      [lengths]="lengths"
      (statusSelected)="statusSelected($event)"
    ></games-segment>
  </ion-header>
  <ion-content>
    <games-list
      [gamesList]="gamesListCollection.$ | async"
      (ionInfinite)="lazyLoad($event)"
    ></games-list>
  </ion-content>
  `
})
export class GamesCom {
  private model: any;
  private requestedTab: string;
  private gamesListCollection: any;
  private lengths: any = {};
  private statusLengthsSub: Subscription;
  private lazyLoadLimit: number = 2;
  private lastSeenId: string;
  private selectedSegment: string = 'pending';

  constructor(
    private gamesSvc: GamesSvc,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private userSvc: UserSvc,
    private modelSvc: ModelSvc
  ){
    this.model = this.navParams.get("model");
    this.requestedTab = this.navParams.get("requestedTab");
    this.gamesListCollection = this.modelSvc.createCollection(GAME);
    this.getByStatus();
  }

  ngOnInit(){
    /*this.statusLengthsSub = this.user.statusLengths$.subscribe(lengths => {
      this.lengths = lengths;
      this.tabSelection();
    });*/
  }

  statusSelected({ value }){
    this.selectedSegment = value;
    this.getByStatus();
  }

  getByStatus(){
    const loading = this.loading();
    loading.present();
    this.lastSeenId = null;

    this.gamesSvc.getByStatus(this.getByStatusArgs)
    .subscribe(({games}) => {
      this.gamesListCollection.update(games);
      loading.dismiss();
    });
  }

  lazyLoad(nScroll){
    let lastSeenId = this.gamesListCollection.last()._id;
    if(this.lastSeenId === lastSeenId) return nScroll.complete();
    this.lastSeenId = lastSeenId;

    this.gamesSvc.getByStatus(Object.assign(this.getByStatusArgs, { lastSeenId }))
    .subscribe(({games}) => {
      this.gamesListCollection.appendArray(games);
      nScroll.complete();
    });
  }

  get getByStatusArgs(){
    return {
      _id: this.model._id,
      by: this.queryBy,
      status: this.selectedSegment,
      limit: this.lazyLoadLimit
    }
  }

  get queryBy(){
    return isModelType(this.model, USER) ? 'user' : 'club';
  }

  loading() {
    return this.loadingCtrl.create({
      content: 'Loading games...',
      showBackdrop: false
    });
  }

  ngOnDestroy(){
    this.gamesListCollection.destroy();
    //this.statusLengthsSub.unsubscribe();
  }
}
