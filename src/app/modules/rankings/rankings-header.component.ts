import { Component, Input } from '@angular/core';

@Component({
	template: `
  <header>
    <ion-grid>
      <ion-row>
        <ion-col width-33>
          <dd></dd>
          <dt>Position</dt>
        </ion-col>

        <ion-col width-33>
          <img>
        </ion-col>

        <ion-col width-33>
          <dd></dd>
          <dt>Wins</dt>
        </ion-col>
      </ion-row>
    </ion-grid>
  </header>
  `,
	selector:'rankings-header'
})
export class RankingsHeaderCom {
  @Input() rankingsList;
  @Input() currentUser;
}
