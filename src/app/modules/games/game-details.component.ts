import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavParams, ModalController } from 'ionic-angular';
import { GameModel } from './game.model';
import { ChallengeCom } from '../challenge/challenge.component';
import { GameRecordResultCom } from '../game-record-result/game-record-result.component';

@Component({
  selector: "game-details",
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>{{game.gameType}}</ion-title>
        <ion-buttons end *ngIf="status(game, ['accepted'])">
          <button (click)="amendGameDetails()" type="button" ion-button icon-only>
            <ion-icon name="settings" item-left></ion-icon>
          </button>
          <button (click)="recordResult()" type="button" ion-button icon-only>
            <ion-icon name="clipboard" item-left></ion-icon>
          </button>
		    </ion-buttons>
      </ion-navbar>
    </ion-header>

    <ion-content no-bounce>
      <games-banner [gameModel]="gameModel"></games-banner>

      <div>
        <ion-segment [(ngModel)]="tab">
          <ion-segment-button value="details">
            Details
          </ion-segment-button>
          <ion-segment-button value="activity">
            Activity
          </ion-segment-button>
        </ion-segment>
      </div>

      <div [ngSwitch]="tab">
        <div *ngSwitchCase="'details'">
          <ion-list>
            <ion-item-group>
              <ion-item>
                <ion-icon name="tennisball" large item-left></ion-icon>
                <h2>{{game.gameType}}</h2>
              </ion-item>
              <ion-item>
                <ion-icon name="pin" item-left large ></ion-icon>
                <h2>{{game.club.name}}</h2>
              </ion-item>
              <ion-item>
                <ion-icon item-left large name="clock"></ion-icon>
                <h2>{{game.date | date :'shortTime'}}</h2>
              </ion-item>
              <ion-item>
                <ion-icon item-left large name="calendar"></ion-icon>
                <h2>{{game.date | date : 'EEEE, d/M/y'}}</h2>
              </ion-item>
            </ion-item-group>

            <ion-item-divider light>Players</ion-item-divider>

            <ion-item-group>
              <ion-item *ngFor="let userModel of gameModel.participants">
                <ion-avatar item-left>
                  <loading-img [src]="userModel.avatar$ | async"></loading-img>
                </ion-avatar>
                <h2>{{(userModel.$ | async)?.details.fullName}}</h2>
              </ion-item>
            </ion-item-group>

          </ion-list>
        </div>

        <game-activity-feed
          *ngSwitchCase="'activity'"
          [gameModel]="gameModel"
        ></game-activity-feed>

      </div>
    </ion-content>
  `
})
export class GameDetailsCom {
  private date: Date = new Date();
  private tab = "details";
  private game: any;
  private gameModel: GameModel;
  private gameModelSub: Subscription;

  constructor(
    private navParams: NavParams,
    private modalController : ModalController
  ){
    this.gameModel = this.navParams.get("gameModel");
    this.gameModelSub = this.gameModel.$.subscribe(game => this.game = game);
  }

  ionViewDidUnload(){
    this.gameModelSub.unsubscribe();
  }

  amendGameDetails(){
		this.modalController.create(ChallengeCom, {
			gameModel: this.gameModel
		}).present();
	}

  recordResult(){
		this.modalController.create(GameRecordResultCom, {
			gameModel: this.gameModel
		}).present();
	}

  status({ status }, list){
		return !!list.find(state => state === status);
	}

}
