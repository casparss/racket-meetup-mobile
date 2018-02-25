import { Component, Input, Output, EventEmitter } from '@angular/core';
import { findKey, once } from 'lodash';

@Component({
  selector: 'games-segment',
  template: `
  <ion-segment *ngIf="!isEmptyState()" (ionChange)="onSelected.emit($event)" [(ngModel)]="selectedSegment">
    <ion-segment-button [disabled]="lengths.pending === 0" value="pending">
      Pending
      <span
        *ngIf="lengths.pending === 0 || selectedSegment === 'pending'; else pending"
      >({{lengths.pending}})</span>
      <ng-template #pending>
        <ion-badge
          item-end
          color="danger"
        >{{lengths.pending}}</ion-badge>
      </ng-template>
    </ion-segment-button>

    <ion-segment-button [disabled]="lengths.accepted === 0" value="accepted">
      Upcoming
      <span
        *ngIf="lengths.accepted === 0 || selectedSegment === 'accepted'; else accepted"
      >({{lengths.accepted}})</span>
      <ng-template #accepted>
        <ion-badge item-end>{{lengths.accepted}}</ion-badge>
      </ng-template>
    </ion-segment-button>

    <ion-segment-button [disabled]="(lengths.played + lengths.rejected + lengths.forfeit) === 0" value="played,rejected,forfeit">
      Previous ({{(lengths.played + lengths.rejected + lengths.forfeit)}})
    </ion-segment-button>
  </ion-segment>
  `
})
export class GamesSegmentCom {
  @Output() onSelected = new EventEmitter()
  @Input() selectedSegment = "pending";
  @Input() lengths: any = {};
  @Input() requestedTab: string;

  private tabSelection = once(() => {
    let { pending, accepted, played, rejected, forfeit } = this.lengths;
    let areLengthsEmpty = () => !findKey(this.lengths, length => length > 0);

    if(areLengthsEmpty()){
      this.selectedSegment = "";
    } else if(this.requestedTab){
      this.selectedSegment = this.requestedTab;
    } else if(pending > 0){
      this.selectedSegment = 'pending';
    } else if(accepted > 0){
      this.selectedSegment = 'accepted';
    } else {
      this.selectedSegment = 'played,rejected,forfeit';
    }
  });

  isEmptyState(){
    return this.selectedSegment === "";
  }
}
