import { Component } from '@angular/core';
import { UserSvc } from '../user-service/user.service';

@Component({
  selector: 'club',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Club</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <header>
        <div class="image-container">
          <img class="club-image" src="assets/images/tennis-court.jpg">
          <h1 class="club-name">
            <ion-icon name="flag" item-left></ion-icon> &nbsp;Lostock Tennis Club
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
          <button ion-item>
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
  			<button type="button" ion-item>
  				<ion-icon name="medal" item-left></ion-icon>
  				Club rankings
  			</button>

        <button ion-item>
  				<ion-icon name="tennisball" item-left></ion-icon>
  				Matches
  			</button>

  			<button ion-item>
  				<ion-icon name="navigate" item-left></ion-icon>
  				Location
  			</button>

        <button ion-item>
  				<ion-icon name="add" item-left></ion-icon>
  				Add to my clubs
  			</button>
  		</ion-list>

      <games-summary [user]="user"></games-summary>

    </ion-content>
  `
})
export class ClubCom {
  private user: any;
  constructor(private userSvc: UserSvc) {
    this.user = this.userSvc.current;
  }

}
