import { Component, Input } from '@angular/core';
import { GamesSvc } from './games.service'
import { UserSvc } from '../user-service';
import { GameModel } from './game.model';

@Component({
  selector: 'games-summary-item',
  template: `
    <button type="button" ion-item>
      <ion-icon name="tennisball" color="primary" item-left></ion-icon>

      <h3>Match</h3>

      <ion-row align-items-center>
        <ion-col col-6>
          <ion-list class="players">
            <ion-item>
              <ion-thumbnail item-left>
                <img [src]="userSvc.generateProfileImage(game.opponents.side1[0].user)">
              </ion-thumbnail>
              {{game.opponents.side1[0].user.details.firstName}}
            </ion-item>
            <ion-item>
              <ion-thumbnail item-left>
                <img [src]="userSvc.generateProfileImage(game.opponents.side2[0].user)">
              </ion-thumbnail>
              {{game.opponents.side2[0].user.details.firstName}}
            </ion-item>
          </ion-list>
        </ion-col>

        <ion-col col-6 class="location-time">
          <ion-list>
            <ion-item><ion-icon item-start name="calendar"></ion-icon> <span>{{game.date | date: 'shortDate' }}</span></ion-item>
            <ion-item><ion-icon item-start name="clock"></ion-icon> <span>{{game.date | date :'shortTime'}}</span></ion-item>
            <ion-item><ion-icon item-start name="pin"></ion-icon> <span>{{game.venue}}</span></ion-item>
          </ion-list>
        </ion-col>

      </ion-row>
    </button>
  `
})
export class GamesSummaryItemCom {
  @Input() gameModel: GameModel;
  private game: any;

  constructor(private userSvc: UserSvc){}

  ngOnInit(){
    this.gameModel.$.subscribe(game => this.game = game);
  }
}
