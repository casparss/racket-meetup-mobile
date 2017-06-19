import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInt } from '../user-service/user.interface';
import { DecHttp } from '../../utils/http/';
import { NavController } from 'ionic-angular';
import { BaseService } from "../../utils/base/base.service";
import { Utils } from '../../utils/util-helpers';
import { Observable } from 'rxjs/Observable';
import { GameInt } from './games.interfaces';
import { ConfigSvc } from '../config/config.service';
import { GameModel } from './game.model';

let mapToModel = game => new GameModel(game);

@Injectable()
export class GamesSvc extends BaseService {

	url = "games";
	public onPushToCurrent: EventEmitter<any> = new EventEmitter();

	constructor(
		protected nav: NavController,
		http: DecHttp,
		configSvc: ConfigSvc
	){
		super(http, configSvc);
	}

	get(id:string = ""){
    return id !== "" ?
      this._getById(null, id).map(games => games.map(mapToModel)) :
      Utils.observable.error("No ID passed to games svc.");
	}

	challenge(challengeDetails: Object, { _id }){
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
