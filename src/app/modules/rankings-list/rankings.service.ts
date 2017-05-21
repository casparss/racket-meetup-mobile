import {Injectable} from '@angular/core';
import {BaseService} from '../../utils/base/base.service';
import {DecHttp} from '../../utils/http';
import { ConfigSvc } from '../config/config.service';

@Injectable()
export class RankingsSvc extends BaseService{

	url = 'rankings';
	private rankingsList$: any;

	constructor(http: DecHttp, configSvc: ConfigSvc){
		super(http, configSvc);
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
