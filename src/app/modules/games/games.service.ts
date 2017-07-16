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

@Injectable()
export class GamesSvc extends BaseService {

	url = "games";
	public onPushToCurrent: EventEmitter<any> = new EventEmitter();
	private lengthsSubject: Subject<any> = new Subject();
	public lengths$: Observable<any> = this.lengthsSubject.asObservable();

	constructor(
		protected nav: NavController,
		private userModelSvc: UserModelSvc,
		private userSvc: UserSvc,
		private modelSvc: ModelSvc,
		http: DecHttp,
		configSvc: ConfigSvc
	){
		super(http, configSvc);
	}

	getByStatus(_id: string, status: string, type?){
		let search = HttpUtils.urlParams({ status, type });
		return this._get(null, { search }, null, `/${_id}`)
			.do(({ lengths = {} }) => this.lengthsSubject.next(lengths))
			.do(({ lengths = {} }) => this.userModelSvc.onLengthsRetrieval.emit({ _id, lengths}))
			.map(({ games = [] }) => games.map(game => this.modelSvc.create(game)));
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
			.map(game => this.modelSvc.create(game))
			.do(game => this.pushToCurrent(game))
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

	pushToCurrent(game){
		this.onPushToCurrent.emit(game);
	}

}
