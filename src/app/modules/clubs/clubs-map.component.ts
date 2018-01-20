import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as mapStyle from './google-map-style.json';

declare var google;

const markers = {
  SHIELD: 'assets/icon/shield.svg',
  SHIELD_SELECTED: 'assets/icon/shield-selected.svg',
  YOUR_LOCATION: 'assets/icon/gps-fixed-indicator.svg'
};

@Component({
  selector: 'clubs-map',
  template: `
    <div #map style="height:250px;"></div>
  `
})
export class ClubsMapCom {
  private map: any = {};
  private mapLoaded: boolean;
  private markersLoaded: boolean = false;
  private loading: any;
  private selectedMarker: any;
  @Input() clubs: Array<any> = [];
  @ViewChild('map') mapEl:ElementRef;

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController
  ){
    this.loading = this.loadingCtrl.create();
  }

  ngOnInit(){
    this.loading.present();
    <Promise<any>>this.geolocation.getCurrentPosition()
			.then(({ coords }) => this.loadMap(coords));
  }

  loadMap(position) {
    const { longitude, latitude } = position
    const latLng = new google.maps.LatLng(latitude, longitude);

    const mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: mapStyle,
      disableDefaultUI: true,
      mapTypeControl: false,
    };

    this.map = new google.maps.Map(this.mapEl.nativeElement, mapOptions);
    this.addMyMarker(position);
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => this.mapReady());
  }

  mapReady(){
    this.mapLoaded = true;
    this.loadMarkers();
  }

  loadMarkers(){
    if(!this.markersLoaded && this.mapLoaded && this.clubs && this.clubs.length > 0){
      this.loading.dismiss();
      this.clubs.forEach((club, i) => this.addClubMarker(club, i));
      this.markersLoaded = true;
    }
  }

  addMyMarker({ longitude, latitude }){
    return new google.maps.Marker({
      position: {
        lat: latitude,
        lng: longitude
      },
      icon: {
        url: 'assets/icon/gps-fixed-indicator.svg'
      },
      map: this.map,
      animation: google.maps.Animation.DROP,
    });
  }

  addClubMarker(club, i){
    const marker = new google.maps.Marker({
      icon: {
        url: markers.SHIELD,
        scale: 2
      },
      title: club.title,
      position: club.location,
      map: this.map,
      animation: google.maps.Animation.DROP,
    });

    marker.addListener('click', () => {
      this.map.panTo(club.location);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      marker.setIcon(markers.SHIELD_SELECTED);
      setTimeout(() => marker.setAnimation(null), 1400);
      if(this.selectedMarker){
        this.selectedMarker.setIcon(markers.SHIELD);
      }
      this.selectedMarker = marker;
    });
  }

  ngOnChanges(){
    this.loadMarkers();
  }
}
