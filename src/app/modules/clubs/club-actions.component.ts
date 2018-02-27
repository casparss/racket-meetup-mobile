import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClubsSvc } from './clubs.service';

import { RankingsCom } from '../rankings/rankings.component';
import { GamesCom } from '../games/games.component';
import { ClubPlayerListCom } from './club-player-list.component';

@Component({
  selector: 'club-actions',
  template: `
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
  `
})
export class ClubActionsCom {
  @Input() clubModel: any = {};
  private isMyClub: boolean;

  constructor(
    private nav: NavController,
    private clubsSvc: ClubsSvc
  ){}

  openPage(){
    this.nav.push(RankingsCom, { clubModel: this.clubModel });
  }

  openGames(){
    this.nav.push(GamesCom, { model: this.clubModel });
  }

  openClubPlayerList(){
    this.nav.push(ClubPlayerListCom, this.clubModel);
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
