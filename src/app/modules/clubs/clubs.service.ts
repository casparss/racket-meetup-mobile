import { Injectable } from '@angular/core';
import { BaseService } from "../../utils/base/base.service";
import { DecHttp, HttpUtils } from '../../utils/http/';
import { ConfigSvc } from '../config/config.service';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class ClubsSvc extends BaseService {

  constructor(
    private geolocation: Geolocation,
    http: DecHttp,
		configSvc: ConfigSvc
  ){
    super(http, configSvc);
  }

  getLocalClubs(){
		return <Promise<any>>this.geolocation.getCurrentPosition()
			.then(({ coords }) => this.getClubs(coords))
			.catch(err => console.log('Error getting location', err));
	}

	getClubs({ longitude, latitude }){
		let location = `${latitude},${longitude}`;
		let search = HttpUtils.urlParams({ location });
		return this._get(null, { search }, "/clubs").toPromise();
	}
}
