import { Component, Input } from '@angular/core';
import { UserInt } from '../user-service/user.interface';

@Component({
  selector: 'opponents',
	template: `
    <ion-grid>
      <ion-row class="opponents">
        <ion-grid>
          <ion-row>
            <ion-col width-100>
              <ion-grid>
                <ion-row>
                  <ion-col width-33>
                    <img [src]="challenger.details.image" alt="">
                    <div class="playerName">{{challenger.fullName}}</div>
                  </ion-col>

                  <ion-col width-33>
                    <div class="vs">Vs.</div>
                  </ion-col>

                  <ion-col width-33>
                    <img [src]="challenger.details.image">
                    <div class="playerName">{{challengee.fullName}}</div>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-row>
    <ion-grid>
  `
})
export class OpponentsCom {
	@Input() challenger: UserInt;
  @Input() challengee: UserInt;
}
