import {Injectable} from '@angular/core';
import {DecHttp} from '../../utils/http/';
import {NavController} from 'ionic-angular';
import {BaseService} from "../../utils/base/base.service.ts";
import {Utils} from '../../utils/util-helpers.ts';
import {Observable} from 'rxjs/Observable';
import {GameInt} from './games.interfaces.ts';

@Injectable()
export class GamesService extends BaseService{

	url = "games";

	public games$: any;

	constructor(
		protected nav: NavController,
		http: DecHttp
	){
		super(http);
		this.games$ = this.createObservable('games');
	}

	get(id:string = ""){
		if(id !== ""){
			return this._getById('games', id);
		} else {
			return Utils.observable.error("No ID passed to games svc.");
		}
	}

}