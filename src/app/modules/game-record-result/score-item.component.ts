import { Component, Input, EventEmitter } from '@angular/core';
import { ScoreInt } from './game-record-result.interfaces';

@Component({
  selector: 'score-item',
  template:`
    <ion-item no-padding>
      <ion-grid>
        <ion-row [ngSwitch]="active">
          <ion-col col-2>
            <div>Set 1</div>
          </ion-col>
          <ion-col col-4>
            <button *ngSwitchCase="true" icon-only ion-button small clear (click)="deincrement('side1')" [disabled]="score['side1'] === 0">
              <ion-icon name="remove-circle"></ion-icon>
            </button>
            <div class="score">{{score.side1}}</div>
            <button *ngSwitchCase="true" icon-only ion-button small clear (click)="increment('side1')">
              <ion-icon name="add-circle"></ion-icon>
            </button>
          </ion-col>
          <ion-col col-4>
            <button *ngSwitchCase="true" icon-only ion-button small clear (click)="deincrement('side2')" [disabled]="score['side2'] === 0">
              <ion-icon name="remove-circle"></ion-icon>
            </button>
            <div class="score">{{score.side2}}</div>
            <button *ngSwitchCase="true" icon-only ion-button small clear (click)="increment('side2')">
              <ion-icon name="add-circle"></ion-icon>
            </button>
          </ion-col>
          <ion-col col-2>
            <button *ngSwitchCase="true" icon-only ion-button small (click)="checked()">
              <ion-icon name="checkmark"></ion-icon>
            </button>
            <button *ngSwitchCase="false" icon-only ion-button small outline (click)="toggleState()">
              <ion-icon name="build"></ion-icon>
            </button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
  `
})
export class ScoreItemCom {
  private scoreChecked: EventEmitter<any> = new EventEmitter();
  @Input() score: ScoreInt;
  @Input() index: number;
  private active: boolean = true;

  toggleState(){
    this.active = !this.active;
  }

  checked(){
    this.toggleState();
    this.scoreChecked.emit(this.index);
  }

  increment(side){
    this.score[side]++;
  }

  deincrement(side){
    this.score[side] === 0 ? null : this.score[side]--
  }

}
