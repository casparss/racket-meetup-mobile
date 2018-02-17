import { Injectable } from '@angular/core';
import { BaseService } from "../../utils/base/base.service";
import { DecHttp, HttpUtils } from '../../utils/http/';
import { ConfigSvc } from '../config/config.service';
import { Geolocation } from '@ionic-native/geolocation';
import { ModelSvc } from '../model-service/model.service';
import { UserSvc } from '../user-service/user.service';

@Injectable()
export class ClubsSvc extends BaseService {
  private coords: any;
  private cachingPromise: Promise<any>;
  constructor(
    private geolocation: Geolocation,
    private modelSvc: ModelSvc,
    private userSvc: UserSvc,
    http: DecHttp,
		configSvc: ConfigSvc
  ){
    super(http, configSvc);
    this.cachingPromise = this.cacheGeolocation();
  }

  cacheGeolocation(){
    return <Promise<any>>this.geolocation.getCurrentPosition()
			.then(({ coords }) => this.coords = coords);
  }

  getGeoLocation(){
    return new Promise((resolve, reject) => {
      if(!this.coords){
        this.cachingPromise.then(coords => {
          resolve(coords);
        });
      }
      else {
        resolve(this.coords);
      }
    });
  }

  getLocalClubs(){
    return <Promise<any>>this.getGeoLocation()
      .then((coords: any) => {
        this.coords = coords;
        return this.getClubs(coords);
      })
      .catch(err => console.log('Error getting location', err));
	}

	getClubs({ longitude, latitude }){
		let location = `${latitude},${longitude}`;
		let search = HttpUtils.urlParams({ location });
		return this._get(null, { search }, "/clubs").toPromise();
	}

  getClubModelByPlaceId(placeId, ownerInstance){
		let search = HttpUtils.urlParams({ placeId });
		return this._get(null, { search }, "/club").toPromise()
      //@TODO: should this.modelSvc.create() really be in the service?
      .then(data => this.modelSvc.create(data, ownerInstance));
  }

  toggleMyClub(clubModel){
    return this._update(null, {}, 'clubs/my-club/', clubModel._id).toPromise()
      .then((data) => {
        this.userSvc.toggleMyClub(clubModel, data.isMyClub);
        return data;
      });
  }

  getPlayersByClubId(_id){
    return this._get(null, {}, `club/${_id}/users`).toPromise();
  }

  getPlayersSliceByClubId(_id){
    const search = HttpUtils.urlParams({
      sliceFrom: 0,
      sliceTo: 8
    });
    return this._get(null, { search }, `club/${_id}/users/slice`).toPromise();
  }
}
