import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { UserSvc } from '../user-service/user.service';
import { ClubsSvc } from './clubs.service';
import { ClubsUtils } from './clubs.utils';

import { RankingsListCom } from '../rankings-list/rankings-list.component';
import { GamesCom } from '../games/games.component';
import { FollowersCom } from '../followers/followers.component';

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
        <header>
          <div class="image-container">
            <loading-img class="club-image" [src]="clubModel.image"></loading-img>
            <h1 #clubName ion-fixed class="club-name">
              <ion-icon name="flag" item-left></ion-icon> &nbsp;{{clubModel._?.name}}
            </h1>
          </div>

          <buckets>
            <div>
              <dd>200</dd>
              <dt>Players</dt>
            </div>
            <div>
              <dd>50</dd>
              <dt>Matches</dt>
            </div>
            <div>
              <dd>3</dd>
              <dt>Socials</dt>
            </div>
          </buckets>
        </header>

        <div class="players-summary">
          <ion-list-header class="component-header">
            Players
          </ion-list-header>

          <ion-list>
            <button ion-item (click)="openFollowers()">
              <div class="player-list">
                <div><img class="avatar" src="assets/images/profile.jpg"></div>
                <div><img class="avatar" src="assets/images/profile.jpg"></div>
                <div><img class="avatar" src="assets/images/profile.jpg"></div>
                <div><img class="avatar" src="assets/images/profile.jpg"></div>
                <div><img class="avatar" src="assets/images/profile.jpg"></div>
              </div>
            </button>
          </ion-list>
        </div>

        <ion-list-header class="component-header">
          Actions
        </ion-list-header>

        <ion-list>
          <button ion-item (click)="openPage($event)">
            <ion-icon name="trophy" item-left></ion-icon>
            Rankings
          </button>

          <button ion-item (click)="openGames()">
            <ion-icon name="tennisball" item-left></ion-icon>
            Matches
          </button>

          <button ion-item>
            <ion-icon name="navigate" item-left></ion-icon>
            Location
          </button>

          <button ion-item (click)="toggleMyClub()" [ngSwitch]="isMyClub">
            <ion-icon *ngSwitchCase="false" name="add" item-left></ion-icon>
    				<ion-icon *ngSwitchCase="true" name="remove" item-left></ion-icon>
    				{{isMyClub ? "Remove from" : "Add to"}} my clubs
          </button>
        </ion-list>

        <games-summary [user]="user"></games-summary>
      </loading-block>
    </ion-content>
  `
})
export class ClubCom {
  private user: any;
  private clubModel: any = {};
  private loading: boolean = true;
  private clubImage: string;
  private isMyClub: boolean;

  constructor(
    private nav: NavController,
    private userSvc: UserSvc,
    navParams: NavParams,
    private clubsSvc: ClubsSvc,
    private utils: ClubsUtils
  ) {
    this.user = this.userSvc.current;
    const club = navParams.get('club');
    const clubModel = navParams.get('clubModel');

    if(club){
      this.clubsSvc
        .getClubModelByPlaceId(navParams.get('club').place_id, this)
        .then(clubModel => {
          this.clubModel = clubModel;
          this.loading = false;
          this.isMyClub = this.userSvc.isMyClub(this.clubModel._id);
        });
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

  openPage(){
    this.nav.push(RankingsListCom, {});
  }

  openGames(){
    this.nav.push(GamesCom, {});
  }

  openFollowers(){
    this.nav.push(FollowersCom, {});
  }

  toggleMyClub(){
    this.clubsSvc
      .toggleMyClub(this.clubModel)
      .then(({isMyClub}) => this.isMyClub = isMyClub);
  }

  ionViewDidLeave() {
		this.clubModel.disown(this);
	}
}
