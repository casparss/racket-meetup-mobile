import {Injectable} from '@angular/core';
import {BaseService} from '../../utils/base/base.service';
import {DecHttp} from '../../utils/http';

@Injectable()
export class RankingsSvc extends BaseService{

	url = 'rankings';
	private rankingsList$: any;

	constructor(http: DecHttp){
		super(http);
		this.rankingsList$ = this.create$('rankings');	
		this.getRankings();
	}

	getRankings(){
		return this._get('rankings');
	}

	get top$(){
		return this.rankingsList$;
	}

	get mylevel$(){
		return this.rankingsList$;
	}

}