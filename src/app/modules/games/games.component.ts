import {Component, Input} from '@angular/core';
import {UserInt} from '../user-service/user.interface';
import {GamesSvc} from './games.service';
import {GameInt} from './games.interfaces';

@Component({
	templateUrl:'./games.view.html',
	selector: 'games'
})
export class GamesCom {

	@Input() user: UserInt;
	private games$: any;

	constructor(private svc: GamesSvc){
		this.games$ = this.svc.games$;
	}

	ngOnInit(){
		this.svc.get(this.user._id);
	}

}
