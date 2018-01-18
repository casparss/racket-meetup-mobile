import { Component } from "@angular/core";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

const mapOptions: GoogleMapOptions = {
  camera: {
    target: {
      lat: 43.0741904,
      lng: -89.3809802
    },
    zoom: 18,
    tilt: 30
  }
};

@Component({
  selector: 'clubs-map',
  template: `<div style="height:300px;" id="map-canvas"></div>`
})
export class ClubsMapCom {
  map: GoogleMap;

  constructor(private googleMaps: GoogleMaps){}

  ngOnInit(){
    this.loadMap();
  }

  loadMap(){
    this.map = this.googleMaps.create('map-canvas', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => this.mapReady());
  }

  mapReady(){
    this.map.addMarker({
      title: 'Ionic',
      icon: '#16a086',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    })
    .then(marker => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => { console.log('Clicked!') });
    });
  }
}
