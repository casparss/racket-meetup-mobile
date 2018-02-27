import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { UserSvc } from '../user-service/user.service';
import { ClubsSvc } from './clubs.service';
import { GamesSvc } from '../games/games.service';

import { ClubPlayerListCom } from './club-player-list.component';

@Component({
  selector: 'club',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Club</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <loading-block [loading]="loading">
        <club-header [clubModel]="clubModel"></club-header>

        <div class="players-summary">
          <ion-list-header class="component-header">
            Players
          </ion-list-header>
          <player-summary
            [_id]="clubModel._id"
            (click)="openClubPlayerList()"
          ></player-summary>
        </div>

        <club-actions [clubModel]="clubModel"></club-actions>

        <games-summary [model]="clubModel"></games-summary>
      </loading-block>
    </ion-content>
  `
})
export class ClubCom {
  private user: any;
  private clubModel: any = {};
  private loading: boolean = true;
  private isMyClub: boolean;

  constructor(
    private nav: NavController,
    private userSvc: UserSvc,
    navParams: NavParams,
    private clubsSvc: ClubsSvc,
    private gamesSvc: GamesSvc
  ) {
    this.user = this.userSvc.current;
    const club = navParams.get('club');
    const clubModel = navParams.get('clubModel');

    if(club){
      this.clubsSvc
        .getClubModelByPlaceId(navParams.get('club').place_id, this)
        .then(clubModel => this.clubLoaded(clubModel));
    }
    else if(clubModel){
      this.clubLoaded(clubModel);
    }
    else {
      throw new Error('No club object or model provided to club component');
    }
  }

  clubLoaded(clubModel){
    this.clubModel = clubModel;
    this.loading = false;
    this.isMyClub = this.userSvc.isMyClub(this.clubModel._id);
  }

  openClubPlayerList(){
    this.nav.push(ClubPlayerListCom, this.clubModel);
  }

  ionViewDidLeave() {
		this.clubModel.disown(this);
	}
}
