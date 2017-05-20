import { Component, Input } from '@angular/core';
import { GameInt } from './games.interfaces';

@Component({
	template:`
		<div class="no-games-message" *ngIf="(games | async)?.length === 0">
			<button ion-button color="light" round>No upcoming games at the moment</button>
		</div>
		<div *ngFor="let game of games | async">
	    <ion-list-header class="item-header">
	      {{game.date | date : ddmmyy}} @ <a>{{game.venue}}</a>
	    </ion-list-header>

	    <ion-item class="upcoming">
	      <ion-grid>
	        <ion-row>
	          <ion-col width-33>
	            <img src="{{game.opponents.side1[0].user.details.image}}" alt="">
	            <div class="playerName">{{game.opponents.side1[0].user.details.fullName}}</div>
	          </ion-col>

	          <ion-col width-33>
	            <div class="vs">Vs.</div>
	          </ion-col>

	          <ion-col width-33>
	            <img src="{{game.opponents.side2[0].user.details.image}}">
	            <div class="playerName">{{game.opponents.side2[0].user.details.fullName}}</div>
	          </ion-col>
	        </ion-row>
	      </ion-grid>
	    </ion-item>
	  </div>
  `,
	selector: 'games-list'
})
export class GamesListCom {
	@Input() games: any;
}
