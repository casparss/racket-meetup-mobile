import { Injectable } from '@angular/core';
import { BaseService } from "../../utils/base/base.service";
import { DecHttp, HttpUtils } from '../../utils/http/';
import { ConfigSvc } from '../config/config.service';
import { Geolocation } from '@ionic-native/geolocation';
import { ModelSvc } from '../model-service/model.service';

@Injectable()
export class ClubsSvc extends BaseService {
  private coords: any;
  constructor(
    private geolocation: Geolocation,
    private modelSvc: ModelSvc,
    http: DecHttp,
		configSvc: ConfigSvc
  ){
    super(http, configSvc);
    this.cacheGeolocation();
  }

  cacheGeolocation(){
    <Promise<any>>this.geolocation.getCurrentPosition()
			.then(({ coords }) => this.coords = coords);
  }

  getLocalClubs(){
    if(this.coords){
      return this.getClubs(this.coords);
    }
    else {
      return <Promise<any>>this.geolocation.getCurrentPosition()
        .then(({ coords }) => {
          this.coords = coords;
          return this.getClubs(coords);
        })
        .catch(err => console.log('Error getting location', err));
    }
	}

	getClubs({ longitude, latitude }){
		let location = `${latitude},${longitude}`;
		let search = HttpUtils.urlParams({ location });
		return this._get(null, { search }, "/clubs").toPromise();
	}

  getClubModelByPlaceId(placeId, ownerInstance){
		let search = HttpUtils.urlParams({ placeId });
		return this._get(null, { search }, "/club").toPromise()
      .then(data => this.modelSvc.create(data, ownerInstance));
  }

  toggleMyClub(_id){
    return this._update(null, {}, 'clubs/my-club/', _id).toPromise();
  }
}
