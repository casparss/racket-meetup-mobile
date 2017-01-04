import {Component, Input} from '@angular/core';
import {GamesSvc} from './games.service';
import {GameInt} from './games.interfaces';

@Component({
	templateUrl:'./games.view.html',
	selector: 'games'
})
export class GamesCom {

	@Input() userId: string;
	private games$: any;

	constructor(private svc: GamesSvc){
		this.games$ = this.svc.games$;
	}

	ngOnInit(){
		this.svc.get(this.userId);
	}

}
