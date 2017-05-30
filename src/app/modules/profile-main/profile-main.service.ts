import {Injectable} from '@angular/core';
import {BaseService} from '../../utils/base/base.service';
import {NavController} from 'ionic-angular';
import {DecHttp} from '../../utils/http/';
import { ConfigSvc } from '../config/config.service';

@Injectable()
export class ProfileMainSvc extends BaseService{

	public user: any;
	url = "user";

	constructor(
		protected nav: NavController,
		http: DecHttp,
		configSvc: ConfigSvc
	){
		super(http, configSvc);
	}

	get(userId:string){
		return this._getById('model', userId);
	}

}
