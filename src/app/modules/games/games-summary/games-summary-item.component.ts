import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController } from 'ionic-angular';
import { GamesSvc } from '../games.service'
import { UserSvc } from '../../user-service';
import { GameModel } from '../game.model';
import { ChallengeCom } from '../../challenge/challenge.component';
import { UserUtils } from '../../user-service/user.utils';
import { GameDetailsCom } from '../game-details/game-details.component';

@Component({
  selector: 'games-summary-item',
  template: `
    <ion-item-divider color="light">{{game.date | date: 'shortDate' }}</ion-item-divider>
    <button (click)="viewGameDetails()" type="button" ion-item>
      <ion-list class="custom-list">
        <ion-item><ion-icon item-start color="primary" name="tennisball"></ion-icon> <span>{{game.gameType}}</span></ion-item>
        <ion-item><ion-icon item-start name="pin"></ion-icon> <span>{{game.club.name}}</span></ion-item>
        <ion-item><ion-icon item-start name="clock"></ion-icon> <span>{{game.date | date :'shortTime'}}</span></ion-item>
      </ion-list>
    </button>
  `
})
export class GamesSummaryItemCom {
  @Input() gameModel: GameModel;
  private game: any;
  private side1img: string;
  private side2img: string;
  private gameModelSub: Subscription;

  constructor(
    private userSvc: UserSvc,
    private nav: NavController,
    private userUtils: UserUtils
  ){}

  ngOnInit(){
    this.gameModelSub = this.gameModel.$.subscribe(game => {
      this.game = game;
      this.generateProfileImages();
    });
  }

  ionViewDidUnload(){
    this.gameModelSub.unsubscribe();
  }

  viewGameDetails(){
    this.nav.push(GameDetailsCom, { gameModel: this.gameModel });
  }

  generateProfileImages(){
    let { side1, side2 } = this.game.opponents;
    this.side1img = this.userUtils.generateProfileImage(side1[0].user._id);
    this.side2img = this.userUtils.generateProfileImage(side2[0].user._id);
  }

}
