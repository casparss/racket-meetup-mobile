import { Component, ViewChild } from '@angular/core';
import { MyClubsCom } from './clubs-my.component';
import { LocalClubsCom } from './clubs-local.component';

const SEGMENTS = ['myclubs', 'localclubs'];

@Component({
  selector: 'clubs',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons start>
          <button (click)="refresh()" ion-button icon-only>
            <ion-icon name="refresh"></ion-icon>
          </button>
        </ion-buttons>
        <ion-segment [(ngModel)]="selectedSegment">
          <ion-segment-button value="myclubs">
            My clubs
          </ion-segment-button>
          <ion-segment-button value="localclubs">
            Local clubs
          </ion-segment-button>
        </ion-segment>
        <!--ion-icon name="search"></ion-icon-->
        <ion-buttons end>
          <button ion-button icon-only>
            <ion-icon name="search"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content scroll="false" [ngSwitch]="selectedSegment">
      <local-clubs *ngSwitchCase="'localclubs'"></local-clubs>
      <my-clubs  #myClubs *ngSwitchCase="'myclubs'"></my-clubs>
    </ion-content>
  `
})
export class ClubsCom {
  @ViewChild(MyClubsCom)
  myClubs: MyClubsCom;

  @ViewChild(LocalClubsCom)
  localClubs: LocalClubsCom;

  private selectedSegment: string = SEGMENTS[0];

  refresh(){
    if(this.selectedSegment === SEGMENTS[0]){
      this.myClubs.refresh();
    }
    else if(this.selectedSegment === SEGMENTS[1]){
      this.localClubs.refresh();
    }
  }
}
