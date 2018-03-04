import { Component, Input } from '@angular/core';
import { once } from 'lodash';
import { Subscription } from 'rxjs';
import { NavController } from 'ionic-angular';
import { ClubsSvc } from './clubs.service';
import { GamesSvc, lengthsInt } from '../games/games.service';
import { CLUB } from '../model-service/model.service';

import { RankingsCom } from '../rankings/rankings.component';
import { GamesCom } from '../games/games.component';
import { ClubPlayerListCom } from './club-player-list.component';
import { StatusLengthsSvc } from '../games/status-lengths.service';

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
      <ion-badge *ngIf="(lengths?.accepted) > 0" item-end>{{lengths?.accepted}}</ion-badge>
      <ion-badge *ngIf="(lengths?.played) > 0" item-end color="grey">{{lengths?.played}}</ion-badge>
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
  private played: number;
  private lengths: lengthsInt;
  private statusLengthsSub: Subscription;

  constructor(
    private nav: NavController,
    private clubsSvc: ClubsSvc,
    private gamesSvc: GamesSvc,
    private statusLengthsSvc: StatusLengthsSvc
  ){}

  ngOnChanges(){
    if(this.clubModel._id) {
      this.setStatusLengthsSub();
      this.getLengths();
    }
  }

  setStatusLengthsSub = once(() => {
    this.statusLengthsSub = this.statusLengthsSvc
      .$({ _id: this.clubModel._id, by: CLUB })
      .subscribe(lengths => this.lengths = lengths);
  });

  getLengths(){
    this.gamesSvc.getLengthsOnly({
      _id: this.clubModel._id,
      by: CLUB
    }).subscribe();
  }

  openPage(){
    this.nav.push(RankingsCom, { clubModel: this.clubModel });
  }

  openGames(){
    this.nav.push(GamesCom, {
      model: this.clubModel,
      lengths: this.lengths
    });
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
  
  ionViewDidUnload(){
		this.statusLengthsSub.unsubscribe();
	}
}
