import {Injectable} from '@angular/core';
import {BaseService} from '../../utils/base/base.service.ts';
import {NavController} from 'ionic-angular';
import {DecHttp} from '../../utils/http/';

@Injectable()
export class ProfileMainSvc extends BaseService{

	public user: any;
	url = "user";
	addplayerUrl = "api/user/add";

	constructor(
		protected nav: NavController,
		http: DecHttp
	){
		super(http);
	}

	get(userId:string){
		return this._getById('model', userId);
	}

	addPlayer(userId:string){		
		return this._sync({
			userId: userId
		}, {}, this.addplayerUrl);
	}

}