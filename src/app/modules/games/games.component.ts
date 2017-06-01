import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInt } from '../user-service/user.interface';
import { GamesSvc } from './games.service';
import { GameInt } from './games.interfaces';
import { toPromise } from '../../utils/util-helpers';

@Component({
	template:`
	<ion-list class="games">
		<ion-list-header class="component-header">
			Upcoming games
		</ion-list-header>
		<games-list [games]="games$"></games-list>
	</ion-list>
	`,
	selector: 'games'
})
export class GamesCom {

	@Input() user$: any;
	gamesSubject$: BehaviorSubject<any> = new BehaviorSubject([]);
	games$: Observable<any> = this.gamesSubject$.asObservable();

	constructor(private gamesSvc: GamesSvc){
		this.gamesSvc.onPushToCurrent
			.subscribe(game => this.pushToGames(game));
	}

	ngOnInit(){
		this.getGames();
	}

	pushToGames(game){
		let games = this.gamesSubject$.getValue();
		games.push(game);
		this.gamesSubject$.next(games);
	}

	getGames(){
		toPromise(this.user$)
			.then(({ _id }) => toPromise(this.gamesSvc.get(_id)))
			.then(games => this.gamesSubject$.next(games));
	}

}
