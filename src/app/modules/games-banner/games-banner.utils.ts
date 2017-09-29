import { Injectable } from '@angular/core';

@Injectable()
export class GamesBannerUtils {

  generateBannerImgUrl(photo){
    return photo ?
      this.generateGooglePhotoUrl(photo):
      "assets/images/tennis-court.jpg"
  }

  generateGooglePhotoUrl({ photo_reference }){
    let googleMapsKey = "AIzaSyATf9bQ7VsRDL0acViMekIry5GxH3GDyRI";
    let domain = 'https://maps.googleapis.com/maps/api/place/photo?';
    let maxheight = 600;
    let maxwidth = 800;
    return `${domain}key=${googleMapsKey}&photoreference=${photo_reference}&maxheight=${maxheight}&maxwidth=${maxwidth}`;
  }
}
