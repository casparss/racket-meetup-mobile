import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs';
import { CustomSubject } from '../../../utils/custom-subject';
import { UserInt } from '../../user-service/user.interface';
import { GamesSvc } from '../games.service';
import { GameInt } from '../games.interfaces';
import { toPromise } from '../../../utils/util-helpers';
import { GamesCom } from '../../games/games.component';
import { ModelSvc, GAME } from '../../model-service/model.service';

@Component({
	selector: 'games-summary',
	template:`
	<ion-list class="games">
		<ion-list-header class="component-header">
			Upcoming
		</ion-list-header>
		<ion-list>
			<games-summary-item
				*ngFor="let gameModel of gamesCollection.$ | async; let i=index"
				[gameModel]="gameModel"
			></games-summary-item>

			<button *ngIf="(gamesCollection.$ | async)?.length > 0" (click)="openGames()" type="button" ion-item>View more</button>
	  </ion-list>

		<no-data-message *ngIf="(gamesCollection.$ | async)?.length === 0">No upcoming games at the moment.</no-data-message>
	</ion-list>
	`
})
export class GamesSummaryCom {

	@Input() user: any;
	gamesSubject: CustomSubject = new CustomSubject();
	gamesCollection: any;
	private onPushToCurrentSub: Subscription;

	constructor(
		private gamesSvc: GamesSvc,
		private nav: NavController,
		private modelSvc: ModelSvc
	){
		this.gamesCollection = this.modelSvc.createCollection(GAME);
		this.onPushToCurrentSub = this.gamesSvc.onPushToCurrent.subscribe(game => this.gamesCollection.unshift(game));
	}

	ngOnInit(){
		this.getGames();
	}

	getGames(){
		toPromise(this.user.$)
			.then(({ _id }) => toPromise(this.gamesSvc.getSummary(_id)))
			.then(({games}) => this.gamesCollection.update(games));
	}

	openGames(): void {
		let requestedTab = 'accepted';
		this.nav.push(GamesCom, { _id: this.user._id, requestedTab })
	}

	ngOnDestroy(){
		this.gamesCollection.destroy();
		this.onPushToCurrentSub.unsubscribe();
	}

}
