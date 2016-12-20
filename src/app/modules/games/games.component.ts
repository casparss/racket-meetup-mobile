import {Component, Input} from '@angular/core';
import {GamesService} from './games.service.ts';
import {GameInt} from './games.interfaces.ts';

@Component({
	templateUrl:'build/modules/games/games.view.html',
	selector: 'games',
	providers: [GamesService]
})
export class GamesCom {

	@Input() userId: string;
	private games$: any;

	constructor(private svc: GamesService){
		this.games$ = this.svc.games$;
	}

	ngOnInit(){
		this.svc.get(this.userId);
	}

}