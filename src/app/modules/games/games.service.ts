import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInt } from '../user-service/user.interface';
import { DecHttp,  HttpUtils } from '../../utils/http/';
import { NavController } from 'ionic-angular';
import { BaseService } from "../../utils/base/base.service";
import { Utils } from '../../utils/util-helpers';
import { Observable, Subject } from 'rxjs';
import { GameInt } from './games.interfaces';
import { ConfigSvc } from '../config/config.service';
import { ModelSvc } from '../model-service/model.service';
import { UserModelSvc } from '../user-service/user.model.service';
import { UserSvc } from '../user-service/user.service';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GamesSvc extends BaseService {

	url = "games";
	public onPushToCurrent: EventEmitter<any> = new EventEmitter();

	constructor(
		protected nav: NavController,
		private userModelSvc: UserModelSvc,
		private userSvc: UserSvc,
		private modelSvc: ModelSvc,
		http: DecHttp,
		configSvc: ConfigSvc,
		private geolocation: Geolocation
	){
		super(http, configSvc);
	}

	getByStatus(_id: string, status: string, type?){
		let search = HttpUtils.urlParams({ status, type });
		return this._get(null, { search }, null, `/${_id}`)
			.do(({ lengths = {} }) => this.userModelSvc.onLengthsRetrieval.emit({ _id, lengths}));
	}

	getSummary(_id: string){
		return this.getByStatus(_id, 'accepted', 'summary');
	}

	getLengthsOnly(_id: string){
		let search = HttpUtils.urlParams({ type: 'lengths' });
		return this._get(null, { search }, null, `/${_id}`)
			.do(({ lengths }) => this.userModelSvc.onLengthsRetrieval.emit({ _id, lengths}))
	}

	getLengthsForCurrentUser(){
		return this.getLengthsOnly(this.userSvc.current.user._id).subscribe();
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

	getLocalClubs(){
		return <Promise<any>>this.geolocation.getCurrentPosition()
			.then(({ coords }) => this.getClubs(coords))
			.catch(err => console.log('Error getting location', err));
	}

	getClubs({ longitude, latitude }){
		let location = `${latitude},${longitude}`;
		let search = HttpUtils.urlParams({ location });
		return this._get(null, { search }, "/clubs").toPromise();
	}

}
