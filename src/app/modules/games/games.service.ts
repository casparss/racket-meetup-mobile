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
import { GameModel } from './game.model';

let mapToModel = game => new GameModel(game);

@Injectable()
export class GamesSvc extends BaseService {

	url = "games";
	public onPushToCurrent: EventEmitter<any> = new EventEmitter();
	private lengthsSubject: Subject<any> = new Subject();
	public lengths$: Observable<any> = this.lengthsSubject.asObservable();

	constructor(
		protected nav: NavController,
		http: DecHttp,
		configSvc: ConfigSvc
	){
		super(http, configSvc);
	}

	getByStatus(_id: string, status: string, isSummary?){
		let search = HttpUtils.urlParams({ status, isSummary});
		return this._get(null, { search }, null, `/${_id}`)
			.do(({ lengths }) => this.lengthsSubject.next(lengths))
			.map(({ games }) => games.map(mapToModel));
	}

	getSummary(_id: string){
		return this.getByStatus(_id, "accepted", true);
	}

	challenge(challengeDetails: Object, _id){
    return this._sync(challengeDetails, {}, null, `/${_id}`).map(mapToModel);
  }

	acceptChallenge(_id){
		return this._update(null, {}, 'game/accept/', _id);
	}

	rejectChallenge(_id){
		return this._update(null, {}, 'game/reject/', _id);
	}

	pushToCurrent(game){
		this.onPushToCurrent.emit(game);
	}

}
