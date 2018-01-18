import { Component, Input } from '@angular/core';
import { GameModel } from '../games/game.model';
import { ClubsUtils } from '../clubs/clubs.utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'games-banner',
  template: `
    <div
      class="venue-image-container"
      [ngSwitch]="gameModel.isState(['played'])"
      [attr.data-status]="game.status"
    >
      <loading-img class="banner-img" [src]="bannerImg"></loading-img>

      <div class="players-scores-container" *ngSwitchCase="true">
        <score-line [gameModel]="gameModel" side="1" [status]="game.status"></score-line>
        <score-line [gameModel]="gameModel" side="2" [status]="game.status"></score-line>
      </div>

      <div class="players-versus" *ngSwitchCase="false">
        <div class="center-container">
          <div>
            <loading-img class="avatar" [src]="gameModel.side1.avatar$ | async"></loading-img>
            <div class="name">{{game.opponents.side1[0].user.details.fullName}}</div>
          </div>
          <div class="vs">Vs.</div>
          <div>
            <loading-img class="avatar" [src]="gameModel.side2.avatar$ | async"></loading-img>
            <div class="name">{{game.opponents.side2[0].user.details.fullName}}</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class GamesBannerCom {
  @Input() gameModel: GameModel;
  private game: any;
  private gameModelSub: Subscription;
  private bannerImg: string;
  private status = status;
  constructor(private utils: ClubsUtils){}

  ngOnInit(){
    this.gameModelSub = this.gameModel.$.subscribe(game => {
      this.game = game;
      //@TODO: might be cooler to generate this on the game model instead
      this.bannerImg = this.utils.generateBannerImgUrl(game.club.photo);
    });
  }

  ionViewDidUnload(){
    this.gameModelSub.unsubscribe();
  }
}

@Component({
  selector: 'score-line',
  template: `
    <loading-img class="avatar" [src]="gameModel['side' + side].avatar$ | async"></loading-img>
    <ion-icon [class.hidden]="!isWinner" color="white" name="trophy"></ion-icon>
    <!--div class="name">
    {{(gameModel['side' + side].$ | async)?.details[status === 'played' ? 'firstName' : 'fullName']}}
    </div-->
    <div class="score-button" *ngFor="let setScore of (gameModel.$ | async)?.result['side' + side]">{{setScore}}
    </div>
  `
})
export class ScoreLineCom {
  @Input() gameModel: GameModel;
  @Input() side: string;
  @Input() status: string;
  private isWinner: boolean;
  private statusMap = status;
  ngOnChanges() {
    this.gameModel.$.subscribe(({winner, opponents}) => {
      this.isWinner = winner === opponents[`side${this.side}`][0].user._id;
    });
  }
}
