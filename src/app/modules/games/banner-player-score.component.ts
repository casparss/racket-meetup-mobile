import { Component, Input } from '@angular/core';
import { GameModel } from './game.model';

@Component({
  selector: 'banner-player-score',
  template: `
    <div class="venue-image-container">
      <img src="assets/images/tennis-court.jpg"/>
      <div *ngIf="status(game, ['played'])" class="players-scores-container">
        <ion-list>
          <ion-item>
            <ion-grid>
              <ion-row>
                <ion-col col-1>
                  <loading-img [src]="gameModel.side1.avatar$ | async"></loading-img>
                </ion-col>
                <ion-col col-5>
                  <h2>{{(gameModel.side1.$ | async)?.details.fullName}}</h2>
                </ion-col>
                <ion-col col-6 class="score">
                  <div *ngFor="let setScore of game.result.side1">
                    {{setScore}}
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>

          <ion-item>
            <ion-grid>
              <ion-row>
                <ion-col col-1>
                  <loading-img [src]="gameModel.side2.avatar$ | async"></loading-img>
                </ion-col>
                <ion-col col-5>
                  <h2>{{(gameModel.side2.$ | async)?.details.fullName}}</h2>
                </ion-col>
                <ion-col col-6 class="score">
                  <div *ngFor="let setScore of game.result.side2">
                    {{setScore}}
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>
      </div>
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
