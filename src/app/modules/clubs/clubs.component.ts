import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClubCom } from './club.component';
import { ClubsUtils } from './clubs.utils';
import { ClubsSvc } from './clubs.service';

@Component({
  selector: 'clubs',
  template: `
    <ion-header>
      <ion-toolbar>
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
      <my-clubs *ngSwitchCase="'myclubs'"></my-clubs>
    </ion-content>
  `
})
export class ClubsCom {
  private selectedSegment: string = 'myclubs';
}
