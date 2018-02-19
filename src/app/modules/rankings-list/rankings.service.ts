import {Injectable} from '@angular/core';
import {BaseService} from '../../utils/base/base.service';
import {DecHttp} from '../../utils/http';
import { ConfigSvc } from '../config/config.service';

@Injectable()
export class RankingsSvc extends BaseService{
	private rankingsList$: any;

	constructor(http: DecHttp, configSvc: ConfigSvc){
		super(http, configSvc);
		this.rankingsList$ = this.create$('rankings');
	}

	getRankingsByClubId(_id){
		return this._get(null, {}, `club/${_id}/rankings`);
	}

	get top$(){
		return this.rankingsList$;
	}

	get mylevel$(){
		return this.rankingsList$;
	}

}
