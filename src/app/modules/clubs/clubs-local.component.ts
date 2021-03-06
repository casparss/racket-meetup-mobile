import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ClubCom } from './club.component';
import { ClubsUtils } from './clubs.utils';
import { ClubsSvc } from './clubs.service';

@Component({
  selector: 'local-clubs',
  template: `
    <loading-visibility-block [loading]="loading">
      <clubs-map
        [clubs]="clubs"
        (onClubSelected)="selectClub($event)"
        (loading)="isLoading($event)"
      ></clubs-map>
      <ion-item-divider
        [class.hidden]="!this.clubs.length"
        sticky
        color="light">Local clubs ({{clubs.length}})</ion-item-divider>
      <ion-list #list>
        <ion-item *ngFor="let club of clubs; let i=index" [class.selected]="club.selected">
          <ion-thumbnail item-left>
            <loading-img [src]="club.photo" alt=""></loading-img>
          </ion-thumbnail>
          <h2>{{club.name}}</h2>
          <button ion-button clear item-right (click)="openClub(club)">View</button>
        </ion-item>
      </ion-list>
    </loading-visibility-block>
  `
})
export class LocalClubsCom {
  private loading: boolean = true;
  private clubs: Array<any> = [];
  @ViewChild('list') list:ElementRef;

  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private clubsSvc: ClubsSvc,
    private utils: ClubsUtils,
    private ngZone: NgZone
  ){
    setTimeout(() => this.getLocalCLubs(), 300)
  }

  getLocalCLubs(){
    this.clubsSvc.getLocalClubs()
      .then(clubs => clubs.map(club => {
        return {
          ...club,
          photo: this.utils.generateBannerImgUrl(club.photo)
        }
      }))
      .then(clubs => this.clubs = clubs);
  }

  ngOnInit(){
    //this.loading = true;
  }

  isLoading(isLoading){
    if(!isLoading){
      setTimeout(() => {this.loading = false})
    }
  }

  openClub(club){
    this.nav.push(ClubCom, { club });
  }

  refresh(){
    this.getLocalCLubs();
  }

  selectClub({ i }){
    window.requestAnimationFrame(() => {
      //Scroll to selected item
      const LIST_TOP_OFFSET = 293;
      const ITEM_HEIGHT = 76;
      const list = this.list.nativeElement;
      const selectedItem = list.querySelectorAll('ion-item')[i];
      list.scrollTop = selectedItem.offsetTop - (LIST_TOP_OFFSET + ITEM_HEIGHT);

      //Add selected attribute
      this.ngZone.run(() => {
        this.clubs.forEach((club, mapIndex) => {
          if(i === mapIndex)
            club.selected = true;
          else
            club.selected = false;
        });
      });
    });
  }
}
