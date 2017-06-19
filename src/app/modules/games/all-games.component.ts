import { Component } from '@angular/core';

@Component({
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Games</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content>

    <ion-segment [(ngModel)]="selectedSegment">
      <ion-segment-button value="upcoming">
        Upcoming
      </ion-segment-button>
      <ion-segment-button value="previous">
        Previous
      </ion-segment-button>
      <ion-segment-button value="cancelled">
        Cancelled
      </ion-segment-button>
    </ion-segment>

    <ion-list>



    </ion-list>

  </ion-content>


  `
})
export class AllGamesCom {

}
