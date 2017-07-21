import { Component, ViewChildren, QueryList } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { GameModel } from '../games/game.model';
import { GameInt } from '../games/games.interfaces';
import { ScoreItemCom } from './score-item.component';
import { GamesSvc } from '../games/games.service';
import { UserModel } from '../user-service/user.model';
import { maxBy } from 'lodash';

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
      <ion-list-header class="component-header">Enter score </ion-list-header>
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
        *ngFor="let score of scores; let i = index"
        [score]="score"
        [index]="i"
        (scoreChecked)="scoreItemChecked($event)"></score-item>

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
  private game: GameInt;
  private matchSetRange = 3;
  private winner: UserModel;
  private scores: Array<any> = [{
    side1: 0,
    side2: 0
  }];

  constructor(
    private viewCtrl: ViewController,
    private gamesSvc: GamesSvc
  ){
    this.gameModel = <GameModel>this.viewCtrl.data.gameModel;
    this.gameModel.$.subscribe(game => this.game = game);
  }

  pushNewScore(){
    this.scores.push({
      side1: 0,
      side2: 0
    });
  }

  scoreItemChecked(index){
    if(!this.isEverySetAcountedFor()) this.pushNewScore();
    setTimeout(() => {
      this.setValidScore();
      this.decipherWinner();
    });
  }

  isValidScoring(){
    if(this.scoreItemComs){
      return this.scoreItemComs
        .map(scoreItemCom => scoreItemCom.isValidScore())
        .indexOf(false) === -1;
    } else {
      return false;
    }
  }

  isEverySetAcountedFor(){
    return this.scores.length === this.matchSetRange;
  }

  setValidScore(){
    return this.validScore = this.isValidScoring() && this.isEverySetAcountedFor();
  }

  recordResult(){
    this.gamesSvc.recordResult(this.generateScoresObject(), this.gameModel._id)
      .subscribe(game => {
        this.gameModel.update(game);
        this.viewCtrl.dismiss();
      });
  }

  generateScoresObject(){
    return {
      scores: this.transformScoresObject(),
      winner: this.decipherWinner()
    }
  }

  transformScoresObject(){
    let newObjectForm = {
      side1: [],
      side2: []
    };
    this.scores.forEach(({side1, side2}) => {
      newObjectForm.side1.push(side1);
      newObjectForm.side2.push(side2);
    });
    return newObjectForm;
  }

  decipherWinner(){
    let { side1, side2 } = this.transformScoresObject();
    let accumulate = side => side.reduce((acumulator, current) => acumulator + current);

    let players = [{
      userModel: this.gameModel.side1,
      totalScore: accumulate(side1)
    },
    {
      userModel: this.gameModel.side2,
      totalScore: accumulate(side1)
    }];

    return maxBy(players, ({totalScore}) => totalScore).userModel._id;
  }

}
