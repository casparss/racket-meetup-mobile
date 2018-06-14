import { Component, Input } from '@angular/core';
import { ClubsSvc } from './clubs.service';
import { UserInt } from '../user-service/user.interface';
import { UserUtils } from '../user-service/user.utils';

@Component({
  selector: 'player-summary',
	template: `
  <ion-list>
    <button
      ion-item
      [attr.detail-none]="currentState !== STATE[2] ? true : undefined"
      [ngSwitch]="currentState"
    >
      <div class="player-list">
        <div class="player-item" *ngFor="let playerImage of playerList">
          <loading-img class="avatar" [src]="playerImage"></loading-img>
        </div>
        <ion-spinner
          *ngSwitchCase="STATE[0]"
          icon="spiral"
          class="spinner-stable"
        ></ion-spinner>
        <no-data-message *ngSwitchCase="STATE[1]">No players yet.</no-data-message>
      </div>
    </button>
  </ion-list>
  `
})
export class PlayerSummaryCom {
	@Input() _id: any;
  private playerList: Array<UserInt> = [];
  private STATE = [
    'loading',
    'no-data',
    'success'
  ];
  private currentState: string = this.STATE[0];

  constructor(
    private clubsSvc: ClubsSvc,
    private userUtils: UserUtils
  ){}

  ngOnChanges(){
    if(this._id) this.getPlayerImages();
  }

  getPlayerImages(){
    this.clubsSvc
      .getPlayersSliceByClubId(this._id)
      .then(playerList => playerList.map(user => this.userUtils.generateProfileImage(user)))
      .then(playerList => {
        this.playerList = playerList;
        this.currentState = playerList.length > 0 ?
          this.STATE[2]:
          this.STATE[1];
      })
      .catch(() => this.currentState = this.STATE[1]);
  }
}
