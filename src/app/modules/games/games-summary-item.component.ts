import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GamesSvc } from './games.service'
import { UserSvc } from '../user-service';
import { GameModel } from './game.model';
import { ChallengeCom } from '../challenge/challenge.component';
import { UserUtils } from '../user-service/user.utils';

@Component({
  selector: 'games-summary-item',
  template: `
    <button (click)="openGame()" type="button" ion-item>

      <ion-row align-items-center >
        <ion-col col-6>
          <ion-list class="custom-list">
            <ion-item><ion-icon item-start color="primary" name="tennisball"></ion-icon> <span>Match</span></ion-item>
            <ion-item><ion-icon item-start name="pin"></ion-icon> <span>{{game.venue}}</span></ion-item>
          </ion-list>
        </ion-col>

        <ion-col col-6 >
          <ion-list class="custom-list">
            <ion-item><ion-icon item-start name="calendar"></ion-icon> <span>{{game.date | date: 'shortDate' }}</span></ion-item>
            <ion-item><ion-icon item-start name="clock"></ion-icon> <span>{{game.date | date :'shortTime'}}</span></ion-item>
          </ion-list>
        </ion-col>

      </ion-row>
    </button>
  `
})
export class GamesSummaryItemCom {
  @Input() gameModel: GameModel;
  private game: any;
  private side1img: string;
  private side2img: string;

  constructor(
    private userSvc: UserSvc,
    private nav: NavController,
    private userUtils: UserUtils
  ){}

  ngOnInit(){
    this.gameModel.$.subscribe(game => {
      this.game = game;
      this.generateProfileImages();
    });
  }

  openGame(){
    let { _id } = this.game;
    this.nav.push(ChallengeCom, { _id });
  }

  generateProfileImages(){
    let { side1, side2 } = this.game.opponents;
    this.side1img = this.userUtils.generateProfileImage(side1[0].user._id);
    this.side2img = this.userUtils.generateProfileImage(side2[0].user._id);
  }

}
