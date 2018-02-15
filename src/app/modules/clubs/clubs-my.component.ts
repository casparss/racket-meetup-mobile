import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClubCom } from './club.component';
import { ClubsUtils } from './clubs.utils';
import { ClubsSvc } from './clubs.service';
import { UserSvc } from '../user-service/user.service';

@Component({
  selector: 'my-clubs',
  template: `
    <ion-list *ngIf="clubs.length > 0; else noData">
      <ion-item *ngFor="let club of clubs.$ | async" text-wrap>
        <ion-thumbnail item-left>
          <loading-img [src]="club.image" alt=""></loading-img>
        </ion-thumbnail>
        <h2>{{club?._.name}}</h2>
        <button ion-button clear item-right (click)="openClub(club)">View</button>
      </ion-item>
    </ion-list>
    <ng-template #noData>
      <no-data-message>Add the clubs you regularly play at to this list for easy access. A list of your local clubs will be on the 'Local clubs' tab.</no-data-message>
    </ng-template>
  `
})
export class MyClubsCom {
  private clubs: any;
  constructor(
    private nav: NavController,
    private clubsSvc: ClubsSvc,
    private userSvc: UserSvc
  ){
    this.clubs = this.userSvc.current.clubs
  }

  openClub(clubModel){
    this.nav.push(ClubCom, { clubModel });
  }
}
