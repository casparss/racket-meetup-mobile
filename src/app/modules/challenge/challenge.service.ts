import { Injectable } from '@angular/core';
import { UserInt } from '../user-service/user.interface';
import { DecHttp } from '../../utils/http/';
import { NavController } from 'ionic-angular';
import { BaseService } from "../../utils/base/base.service";
import { Utils } from '../../utils/util-helpers';
import { ConfigSvc } from '../config/config.service';

@Injectable()
export class ChallengeSvc extends BaseService {

	url = "games";

	constructor(
		http: DecHttp,
		configSvc: ConfigSvc
	){
		super(http, configSvc);
	}

  challenge(challengeDetails: Object, challengee: UserInt){
    return this._sync(challengeDetails, {}, null, `/${challengee._id}`);
  }

}
