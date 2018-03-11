import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClubCom } from './club.component';
import { ClubsUtils } from './clubs.utils';
import { ClubsSvc } from './clubs.service';
import { UserSvc } from '../user-service/user.service';
import { ModelSvc, CLUB } from '../model-service/model.service';

@Component({
  selector: 'my-clubs',
  template: `
    <loading-block [loading]="loading">
      <ion-list *ngIf="clubsCollection.length > 0; else noData">
        <ion-item *ngFor="let club of clubsCollection.$ | async" text-wrap>
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
    </loading-block>
  `
})
export class MyClubsCom {
  private clubsCollection: any;
  private loading: boolean = true;

  constructor(
    private nav: NavController,
    private clubsSvc: ClubsSvc,
    private userSvc: UserSvc,
    private modelSvc: ModelSvc
  ){
    this.clubsCollection = this.modelSvc.createCollection(CLUB);
    this.clubsSvc.myClubsRefresh
      .subscribe(() => this.getMyClubs());
  }

  ngOnInit(){
    setTimeout(() => this.getMyClubs(), 300)
  }

  getMyClubs(){
    this.loading = true;
    return this.clubsSvc
      .getMyClubs(this.userSvc.current._id)
      .then(clubs => this.clubsCollection.update(clubs))
      .then(() => this.loading = false);
  }

  openClub(clubModel){
    this.nav.push(ClubCom, { clubModel });
  }

  refresh(){
    this.getMyClubs();
  }

  ngOnDestroy(){
    this.clubsCollection.destroy();
  }
}
