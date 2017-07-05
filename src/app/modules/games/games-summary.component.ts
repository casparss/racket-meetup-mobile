import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { CustomSubject } from '../../utils/custom-subject';
import { UserInt } from '../user-service/user.interface';
import { GamesSvc } from './games.service';
import { GameInt } from './games.interfaces';
import { toPromise } from '../../utils/util-helpers';
import { GamesCom } from '../games/games.component';

@Component({
	selector: 'games-summary',
	template:`
	<ion-list class="games">
		<ion-list-header class="component-header">
			Upcoming
		</ion-list-header>
		<ion-list>
			<games-summary-item
				*ngFor="let gameModel of games$ | async; let i=index"
				[gameModel]="gameModel"
			></games-summary-item>

			<button *ngIf="(games$ | async)?.length > 0" (click)="openGames()" type="button" ion-item>View more</button>
	  </ion-list>
		<div class="no-games-message" *ngIf="(games$ | async)?.length === 0">
			<button ion-button color="light" round>No upcoming games at the moment</button>
		</div>
	</ion-list>
	`
})
export class GamesSummaryCom {

	@Input() user: any;
	gamesSubject: CustomSubject = new CustomSubject();
	games$: Observable<any> = this.gamesSubject.$;

	constructor(
		private gamesSvc: GamesSvc,
		private nav: NavController
	){
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
		toPromise(this.user.$)
			.then(({ _id }) => toPromise(this.gamesSvc.getSummary(_id)))
			.then(games => this.gamesSubject.next(games));
	}

	openGames(): void {
		let tab = 'upcoming';
		this.user.$.subscribe(({ _id }) => this.nav.push(GamesCom, { _id, tab }));
	}

}
