import { Component, ViewChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewController } from 'ionic-angular';
import { GameModel } from '../games/game.model';
import { GameInt } from '../games/games.interfaces';
import { ScoreItemCom } from './score-item.component';
import { GamesSvc } from '../games/games.service';
import { GameRecordResultUtils } from './game-record-result.utils';
import { UserModel } from '../user-service/user.model';

@Component({
  selector: 'game-record-result',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Record result</ion-title>
      <ion-buttons end>
  			<button icon-only ion-button (click)="viewCtrl.dismiss()"><ion-icon name="close"></ion-icon></button>
  		</ion-buttons>
    </ion-navbar>
  </ion-header>

  <ion-content>

    <ion-list>
      <ion-item-divider light>Match type</ion-item-divider>

      <ion-item>
        <ion-select [(ngModel)]="matchSetRange">
          <ion-option [value]="1" selected>1 set match</ion-option>
          <ion-option [value]="3">3 set match</ion-option>
          <ion-option [value]="5">5 set match</ion-option>
        </ion-select>
      </ion-item>

      <ion-item-divider light>Record score</ion-item-divider>
      <ion-item no-padding>
        <ion-grid>
          <ion-row>
            <ion-col col-2></ion-col>
            <ion-col col-4>
              <img class="avatar" src="{{gameModel.side1.avatar$ | async}}" />
            </ion-col>
            <ion-col col-4>
              <img class="avatar" src="{{gameModel.side2.avatar$ | async}}" />
            </ion-col>
            <ion-col col-2></ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
      <score-item
        #scoreItem
        *ngFor="let score of scores; let i=index"
        [score]="score"
        [index]="i"
        (scoreChecked)="scoreItemChecked($event)"
        clear
      ></score-item>
      <ion-item>
        <button [disabled]="!validScore" ion-button block large (click)="recordResult()">Record result</button>
      </ion-item>
    </ion-list>
  </ion-content>
  `
})
export class GameRecordResultCom {
  @ViewChildren(ScoreItemCom) scoreItemComs: QueryList<ScoreItemCom>
  private validScore: boolean = false;
  private gameModel: GameModel;
  private gameModelSub: Subscription;
  private game: GameInt;
  private matchSetRange = 1;
  private winner: UserModel;
  private scores: Array<any> = [{
    side1: 0,
    side2: 0
  }];

  constructor(
    private viewCtrl: ViewController,
    private gamesSvc: GamesSvc,
    private utils: GameRecordResultUtils
  ){
    this.gameModel = <GameModel>this.viewCtrl.data.gameModel;
    this.gameModelSub = this.gameModel.$.subscribe(game => this.game = game);
  }

  ionViewDidUnload(){
    this.gameModelSub.unsubscribe();
  }

  pushNewScore(){
    this.scores.push({
      side1: 0,
      side2: 0
    });
  }

  scoreItemChecked(index){
    if(!this.isWinner()) this.pushNewScore();
    setTimeout(() => this.setValidScore());
  }

  setValidScore(){
    return this.validScore =
      this.utils.isValidScoring(this.scoreItemComs) && this.isWinner();
  }

  isWinner(){
    return this.utils.isWinner(this.scores, this.matchSetRange)
  }

  recordResult(){
    const scores = this.utils.generateScoresObject(this.scores, this.gameModel)
    this.gamesSvc.recordResult(scores, this.gameModel._id)
      .subscribe(game => {
        this.gameModel.update(game);
        this.viewCtrl.dismiss();
      });
  }
}
