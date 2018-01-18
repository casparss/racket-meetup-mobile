import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClubCom } from './club.component';
import { ClubsUtils } from './clubs.utils';
import { ClubsSvc } from './clubs.service';

@Component({
  selector: 'clubs',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Clubs</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <clubs-map></clubs-map>
      <ion-list>
        <ion-item-divider color="light">My clubs (2)</ion-item-divider>
        <ion-item *ngFor="let club of clubs; let i=index">
          <ion-thumbnail item-left>
            <loading-img [src]="club.photo" alt=""></loading-img>
          </ion-thumbnail>
          <h2>{{club.name}}</h2>
          <button ion-button clear item-right (click)="openClub()">View</button>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
export class ClubsCom {
  private clubs: Array<any>;

  constructor(
    private nav: NavController,
    private clubsSvc: ClubsSvc,
    private utils: ClubsUtils
  ){
    this.clubsSvc.getLocalClubs()
      .then(clubs => clubs.map(club => {
        return {
          ...club,
          photo: this.utils.generateBannerImgUrl(club.photo)
        }
      }))
      .then(clubs => this.clubs = clubs);
  }

  openClub(){
    this.nav.push(ClubCom, { id: 1 });
  }
}
