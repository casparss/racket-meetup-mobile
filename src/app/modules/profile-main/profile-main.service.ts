import {Injectable} from '@angular/core';
import {BaseService} from '../../utils/base/base.service';
import {NavController} from 'ionic-angular';
import {DecHttp} from '../../utils/http/';

@Injectable()
export class ProfileMainSvc extends BaseService{

	public user: any;
	url = "user";

	constructor(
		protected nav: NavController,
		http: DecHttp
	){
		super(http);
	}

	get(userId:string){
		return this._getById('model', userId);
	}

}
