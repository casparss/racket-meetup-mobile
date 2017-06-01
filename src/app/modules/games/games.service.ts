import { Injectable, EventEmitter } from '@angular/core';
import { UserInt } from '../user-service/user.interface';
import { DecHttp } from '../../utils/http/';
import { NavController } from 'ionic-angular';
import { BaseService } from "../../utils/base/base.service";
import { Utils } from '../../utils/util-helpers';
import { Observable } from 'rxjs/Observable';
import { GameInt } from './games.interfaces';
import { ConfigSvc } from '../config/config.service';

@Injectable()
export class GamesSvc extends BaseService{

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
      this._getById(null, id) :
      Utils.observable.error("No ID passed to games svc.");
	}

	challenge(challengeDetails: Object, challengee: UserInt){
    return this._sync(challengeDetails, {}, null, `/${challengee._id}`);
  }

	pushToCurrent(game){
		this.onPushToCurrent.emit(game);
	}

}
