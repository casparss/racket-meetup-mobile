import {Component, Input} from '@angular/core';
import {UserInt} from '../user-service/user.interface';
import {GamesSvc} from './games.service';
import {GameInt} from './games.interfaces';
import { toPromise } from '../../utils/util-helpers';

@Component({
	template:`
	<ion-list class="games">
		<ion-list-header class="component-header">
			Upcoming games
		</ion-list-header>
		<games-list [games]="svc.games$"></games-list>
	</ion-list>
	`,
	selector: 'games'
})
export class GamesCom {

	@Input() user$: any;
	private games$: any;

	constructor(private svc: GamesSvc){}

	ngOnInit(){
		toPromise(this.user$).then(({ _id }) => this.svc.get(_id).subscribe());
	}

}
