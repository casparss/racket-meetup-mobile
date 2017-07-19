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
    <table>
      <thead>
        <tr>
          <td></td>
          <td>Set 1</td>
          <td>Set 2</td>
          <td>Set 3</td>
          <td>Set 4</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><img src="{{gameModel.avatar$ | async}}" /></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>

    </table>
  </ion-content>
  `
})
export class GameRecordResultCom {

  private gameModel: GameModel;
  private game: GameInt;

  constructor(private viewCtrl: ViewController){
    this.gameModel = <GameModel>this.viewCtrl.data.gameModel;
    this.gameModel.$.subscribe(game => this.game = game);
  }


}
