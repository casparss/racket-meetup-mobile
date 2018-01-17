import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClubCom } from './club.component';

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Clubs</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item-divider color="light">My clubs (2)</ion-item-divider>
        <ion-item>
          <ion-thumbnail item-left>
            <img src="assets/images/tennis-court.jpg">
          </ion-thumbnail>
          <h2>Lostock Tennis Club</h2>
          <p>Bolton</p>
          <button ion-button clear item-right (click)="openClub()">View</button>
        </ion-item>
        <ion-item>
          <ion-thumbnail item-left>
            <img src="assets/images/tennis-court.jpg">
          </ion-thumbnail>
          <h2>West Herts Tennis Club</h2>
          <p>Bolton</p>
          <button ion-button clear item-right (click)="openClub()">View</button>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
export class ClubsCom {
  constructor(private nav: NavController,){

  }

  openClub(){
    this.nav.push(ClubCom, { id: 1 });
  }
}
