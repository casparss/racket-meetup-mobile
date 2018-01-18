import { Injectable } from '@angular/core';
import { ConfigSvc } from '../config/config.service';

@Injectable()
export class ClubsUtils {
  constructor(private configSvc: ConfigSvc){}

  generateBannerImgUrl(photo){
    return photo ?
      this.generateGooglePhotoUrl(photo):
      "assets/images/tennis-court.jpg"
  }

  generateGooglePhotoUrl({ photo_reference }){
    let googleMapsKey = this.configSvc.get('googleMapsKey');
    let domain = 'https://maps.googleapis.com/maps/api/place/photo?';
    let maxheight = 600;
    let maxwidth = 800;
    return `${domain}key=${googleMapsKey}&photoreference=${photo_reference}&maxheight=${maxheight}&maxwidth=${maxwidth}`;
  }
}
