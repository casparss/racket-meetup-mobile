import { Component, Input, Output, EventEmitter } from '@angular/core';
import { findKey, once } from 'lodash';
import { Subscription } from 'rxjs';

const SEGMENTS = [
  'pending',
  'accepted',
  'played,rejected,forfeit'
];

@Component({
  selector: 'games-segment',
  template: `
  <ion-segment *ngIf="!isEmptyState()" (ionChange)="emitSelectedStatus($event)" [(ngModel)]="selectedSegment">

    <ion-segment-button
      *ngIf="!hidePending"
      value="pending"
      [disabled]="lengths?.pending === 0"
    >Pending
      <span
        *ngIf="lengths?.pending === 0 || selectedSegment === 'pending'; else pending"
      >({{lengths?.pending}})</span>
      <ng-template #pending>
        <ion-badge
          item-end
          color="danger"
        >{{lengths?.pending}}</ion-badge>
      </ng-template>
    </ion-segment-button>

    <ion-segment-button [disabled]="lengths?.accepted === 0" value="accepted">
      Upcoming
      <span
        *ngIf="lengths?.accepted === 0 || selectedSegment === 'accepted'; else accepted"
      >({{lengths?.accepted}})</span>
      <ng-template #accepted>
        <ion-badge item-end>{{lengths?.accepted}}</ion-badge>
      </ng-template>
    </ion-segment-button>

    <ion-segment-button [disabled]="(lengths?.played + lengths?.rejected + lengths?.forfeit) === 0" value="played,rejected,forfeit">
      Previous ({{(lengths?.played + lengths?.rejected + lengths?.forfeit)}})
    </ion-segment-button>
  </ion-segment>
  `
})
export class GamesSegmentCom {
  @Output() statusSelected = new EventEmitter()
  @Input() lengths: any = {};
  @Input() requestedTab: string;
  @Input() hidePending: boolean = false;
  private selectedSegment: string;
  isEmptyState(){
    return this.selectedSegment === "";
  }
  ngOnInit(){
    this.selectedSegment = (this.setInitalStatusSegment() || "");
    this.emitSelectedStatus();
  }
  emitSelectedStatus(){
    this.statusSelected.emit(this.selectedSegment);
  }
  setInitalStatusSegment(){
    return SEGMENTS
      .find(status => {
        if(this.hidePending && status === 'pending') {
          return false;
        }
        else {
          return !!status.split(',').find(status => this.lengths[status] > 0)
        }
      });
  }
}
