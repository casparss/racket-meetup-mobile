import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ClubsSvc } from './clubs.service';
import { MAP_STYLE } from './google-map-style';

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
  private selectedMarker: any;
  @Output() onClubSelected: EventEmitter<any> = new EventEmitter();
  @Output() loading: EventEmitter<any> = new EventEmitter();
  @Input() clubs: Array<any> = [];
  @ViewChild('map') mapEl:ElementRef;

  constructor(private clubsSvc: ClubsSvc){}

  ngOnInit(){
    this.loading.emit(true);
    this.clubsSvc
      .getGeoLocation()
      .then((coords) => this.loadMap(coords));
  }

  loadMap(position) {
    const { longitude, latitude } = position
    const latLng = new google.maps.LatLng(latitude, longitude);

    const mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: MAP_STYLE,
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
      this.clubs.forEach((club, i) => this.addClubMarker(club, i));
      this.markersLoaded = true;
      this.loading.emit(false);
    }
  }

  addMyMarker({ longitude, latitude }){
    return new google.maps.Marker({
      position: {
        lat: latitude,
        lng: longitude
      },
      icon: {
        url: markers.YOUR_LOCATION
      },
      map: this.map,
      //animation: google.maps.Animation.DROP,
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
      //animation: google.maps.Animation.DROP,
    });

    marker.addListener('click', () => {
      this.onClubSelected.emit({club, i});
      //this.map.panTo(club.location);
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
