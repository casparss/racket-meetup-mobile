import { Component, Input } from '@angular/core';
import { GameModel } from './game.model';

@Component({
  selector: 'banner-player-score',
  template: `
    <div class="venue-image-container">
      <img src="assets/images/tennis-court.jpg"/>
      <div *ngIf="status(game, ['played'])" class="players-scores-container">
      <score-line [gameModel]="gameModel" side="1"></score-line>
      <score-line [gameModel]="gameModel" side="2"></score-line>
    </div>
  `
})
export class BannerPlayerScoreCom {
  @Input() gameModel: GameModel;
  private game: any;
  ngOnInit(){
    this.gameModel.$.subscribe(game => this.game = game);
  }

  status({ status }, list){
		return !!list.find(state => state === status);
	}
}

@Component({
  selector: 'score-line',
  template: `
    <loading-img [src]="gameModel.side1.avatar$ | async"></loading-img>
    <div class="name">{{(gameModel['side' + side].$ | async)?.details.firstName}}</div>
    <div class="score-button" *ngFor="let setScore of (gameModel.$ | async)?.result['side' + side]">{{setScore}}
    </div>
  `
})
export class ScoreLineCom {
  @Input() gameModel: GameModel;
  @Input() side: string;
}
