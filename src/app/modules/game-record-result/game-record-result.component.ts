import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { GameModel } from '../games/game.model';
import { GameInt } from '../games/games.interfaces';

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
        *ngFor="let score of scores; let i = index"
        [score]="score"
        [index]="i"
        (scoreChecked)="scoreItemChecked($event)"></score-item>

      <ion-item>
        <button
          ion-button
          block
          large>Record result</button>
      </ion-item>
    </ion-list>


  </ion-content>
  `
})
export class GameRecordResultCom {

  private gameModel: GameModel;
  private game: GameInt;
  private scores: Array<any> = [{
    side1: 0,
    side2: 0
  }];

  constructor(private viewCtrl: ViewController){
    this.gameModel = <GameModel>this.viewCtrl.data.gameModel;
    this.gameModel.$.subscribe(game => this.game = game);
  }

  pushScore(){
    this.scores.push({
      side1: 0,
      side2: 0
    });
  }

  scoreItemChecked(index){
    debugger;
  }


}
