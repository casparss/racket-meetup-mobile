import { Injectable, EventEmitter } from '@angular/core';
import { Events } from 'ionic-angular';
import { DecHttp,  HttpUtils } from '../../utils/http/';
import { BaseService } from "../../utils/base/base.service";
import { ConfigSvc } from '../config/config.service';
import { StatusLengthsSvc } from './status-lengths.service';
import { UserSvc } from '../user-service/user.service';
interface getByStatusInt {
	_id: string,
	status: string,
	type?: string,
	lastSeenId?: string,
	limit?: number,
	by: string
}

export interface lengthsInt {
	accepted: number,
	forfeit: number,
	pending: number,
	played: number,
	rejected: number
}

@Injectable()
export class GamesSvc extends BaseService {
	url = "games";
	public onPushToCurrent: EventEmitter<any> = new EventEmitter();

	constructor(
		private statusLengthsSvc: StatusLengthsSvc,
		private userSvc: UserSvc,
		events: Events,
		http: DecHttp,
		configSvc: ConfigSvc
	){
		super(http, configSvc);
		events.subscribe('game', () => this.getLengthsForCurrentUser())
	}

	getByStatus({ _id, status, type = 'filter', lastSeenId, limit, by }: getByStatusInt){
		const search = HttpUtils.urlParams({ status, type, lastSeenId, limit, by });
		return this._get(null, { search }, null, `/${_id}`)
			.do(({ lengths = {} }) => this.statusLengthsSvc.emit({ _id, lengths, by }));
	}

	getSummary(opts){
		return this.getByStatus({status: 'accepted', type: 'summary', ...opts});
	}

	getLengthsOnly(opts){
		const { _id, by } = opts;
		let search = HttpUtils.urlParams({ type: 'lengths', ...opts });
		return this._get(null, { search }, null, `/${_id}`)
			.do(({ lengths }) => this.statusLengthsSvc.emit({ _id, lengths, by })
		)
	}

	getLengthsForCurrentUser(){
		return this.getLengthsOnly({
			_id: this.userSvc.current.user._id,
			by: 'User'
		}).subscribe();
	}

	challenge(challengeDetails: Object, _id){
    return this._sync(challengeDetails, {}, null, `/${_id}`)
			.do(() => this.getLengthsForCurrentUser());
  }

	acceptChallenge(_id){
		return this._update(null, {}, 'game/accept/', _id)
			.do(() => this.getLengthsForCurrentUser());
	}

	rejectChallenge(_id){
		return this._update(null, {}, 'game/reject/', _id)
			.do(() => this.getLengthsForCurrentUser());
	}

	updateDetails(challengeDetails: Object, _id){
		return this._update(challengeDetails, {}, 'game', `/${_id}`);
	}

	recordResult(result, _id){
		return this._update(result, {}, 'game/score', `/${_id}`);
	}

	pushToCurrent(game){
		this.onPushToCurrent.emit(game);
	}
}
