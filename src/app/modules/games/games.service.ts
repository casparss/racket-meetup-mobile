import {Injectable} from '@angular/core';
import {UserInt} from '../user-service/user.interface';
import {DecHttp} from '../../utils/http/';
import {NavController} from 'ionic-angular';
import {BaseService} from "../../utils/base/base.service";
import {Utils} from '../../utils/util-helpers';
import {Observable} from 'rxjs/Observable';
import {GameInt} from './games.interfaces';

@Injectable()
export class GamesSvc extends BaseService{

	url = "games";

	public games$: any;

	constructor(
		protected nav: NavController,
		http: DecHttp
	){
		super(http);
		this.games$ = this.create$('games');
	}

	get(id:string = ""){
    return id !== "" ?
      this._getById('games', id) :
      Utils.observable.error("No ID passed to games svc.");
	}

  challenge(challengeDetails: Object, challengee: UserInt){
    this._sync(challengeDetails, {}, null, this.params(challengee._id));
  }

}
