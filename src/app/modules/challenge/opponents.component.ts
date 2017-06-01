import { Component, Input } from '@angular/core';
import { UserInt } from '../user-service/user.interface';

@Component({
  selector: 'opponents',
	template: `
    <ion-grid>
      <ion-row>
        <ion-grid>
          <ion-row>
            <ion-col width-100>
              <ion-grid>
                <ion-row>
                  <ion-col width-33>
                    <loading-img [src]="challenger.details.image" alt=""></loading-img>
                    <div class="playerName">{{challenger.details.firstName}}</div>
                  </ion-col>

                  <ion-col width-33>
                    <div class="vs">Vs.</div>
                  </ion-col>

                  <ion-col width-33>
                    <loading-img [src]="challengee.details.image"></loading-img>
                    <div class="playerName">{{challengee.details.firstName}}</div>
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
