import { Component, Input } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { GameModel } from './game.model';
import { UserSvc } from '../user-service/user.service';
import { GamesSvc } from './games.service';
import { ModelSvc, isModelType, USER, CLUB, GAME } from '../model-service/model.service';
import { StatusLengthsSvc } from './status-lengths.service';

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
    <loading-block [loading]="isInitialLoad">
      <games-list
        [gamesList]="gamesListCollection.$ | async"
        (ionInfinite)="lazyLoad($event)"
      ></games-list>
    </loading-block>
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
  private selectedSegment: string;
  private isInitialLoad: boolean = true;

  constructor(
    private gamesSvc: GamesSvc,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private userSvc: UserSvc,
    private modelSvc: ModelSvc,
    private statusLengthsSvc: StatusLengthsSvc
  ){
    this.model = this.navParams.get("model");
    this.lengths = this.navParams.get("lengths");
    this.requestedTab = this.navParams.get("requestedTab");
    this.gamesListCollection = this.modelSvc.createCollection(GAME);
  }

  ngOnInit(){
    this.statusLengthsSub = this.statusLengthsSvc
			.$({ _id: this.model._id, by: this.queryBy })
			.subscribe(lengths => this.lengths = lengths);
  }

  statusSelected(value){
    this.selectedSegment = value;
    if(!this.isInitialLoad) this.getByStatus();
  }

  ionViewDidEnter(){
    if(this.isInitialLoad) this.getByStatus();
    this.isInitialLoad = false;
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
    let lastSeenId = (this.gamesListCollection.last() || {})._id;
    if(lastSeenId === undefined || this.lastSeenId === lastSeenId){
      return nScroll.complete();
    }
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
    this.statusLengthsSub.unsubscribe();
  }
}
