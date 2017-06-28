import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomSubject } from '../../utils/custom-subject';
import { UserInt } from '../user-service/user.interface';
import { GamesSvc } from './games.service';
import { GameInt } from './games.interfaces';
import { toPromise } from '../../utils/util-helpers';

@Component({
	selector: 'games-summary',
	template:`
	<ion-list class="games">
		<ion-list-header class="component-header">
			Upcoming
		</ion-list-header>
		<ion-list>
	    <ng-container *ngFor="let gameModel of games$ | async; let i=index">
	      <games-summary-item *ngIf="i < 3" [gameModel]="gameModel"></games-summary-item>
	    </ng-container>
	  </ion-list>
		<div class="no-games-message" *ngIf="(games$ | async)?.length === 0">
			<button ion-button color="light" round>No upcoming games at the moment</button>
		</div>
	</ion-list>
	`
})
export class GamesSummaryCom {

	@Input() user$: any;
	gamesSubject: CustomSubject = new CustomSubject();
	games$: Observable<any> = this.gamesSubject.$;

	constructor(private gamesSvc: GamesSvc){
		this.gamesSvc.onPushToCurrent
			.subscribe(game => this.pushToGames(game));
	}

	ngOnInit(){
		this.getGames();
	}

	pushToGames(game){
		let games = this.gamesSubject.getValue();
		games.unshift(game);
		this.gamesSubject.next(games);
	}

	getGames(){
		toPromise(this.user$)
			.then(({ _id }) => toPromise(this.gamesSvc.get(_id)))
			.then(games => this.gamesSubject.next(games));
	}

}
