import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';
import { GameModel } from './game.model';
import { ChallengeCom } from '../challenge/challenge.component';
import { GameRecordResultCom } from '../game-record-result/game-record-result.component';

@Component({
  selector: "game-details",
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title><ion-icon name="tennisball" large item-left></ion-icon> {{game.gameType}}</ion-title>
        <!--ion-buttons end>
		      <button ion-button icon-only>
		        <ion-icon name="menu"></ion-icon>
		      </button>
		    </ion-buttons-->
      </ion-navbar>
    </ion-header>

    <ion-content no-bounce>

      <banner-player-score [gameModel]="gameModel"></banner-player-score>

      <ion-list *ngIf="status(game, ['accepted'])">
        <ion-list-header class="component-header">
          Actions
        </ion-list-header>

        <button (click)="amendGameDetails()" type="button" ion-item>
          <ion-icon name="settings" item-left></ion-icon>
          Amend details
        </button>
        <button (click)="recordResult()" type="button" ion-item>
          <ion-icon name="clipboard" item-left></ion-icon>
          Record score
        </button>
      </ion-list>

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
              <ion-list-header class="component-header">
                Details
              </ion-list-header>
              <ion-item>
                <ion-icon name="pin" item-left large ></ion-icon>
                <h2>{{game.venue}}</h2>
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
          </ion-list>
        </div>

        <div *ngSwitchCase="'activity'">
          <h2>Activity</h2>
        </div>
      </div>

    </ion-content>
  `
})
export class GameDetailsCom {
  private date: Date = new Date();
  private tab = "details";
  private game: any;
  private gameModel: GameModel;

  constructor(
    private navParams: NavParams,
    private modalController : ModalController
  ){
    this.gameModel = this.navParams.get("gameModel");
    this.gameModel.$.subscribe(game => this.game = game);
  }

  amendGameDetails(){
		let challengeModal = this.modalController.create(ChallengeCom, {
			gameModel: this.gameModel
		});

		challengeModal.present();
	}

  recordResult(){
		let recordScoreModal = this.modalController.create(GameRecordResultCom, {
			gameModel: this.gameModel
		});

		recordScoreModal.present();
	}

  status({ status }, list){
		return !!list.find(state => state === status);
	}

}
