import { Component, Input } from '@angular/core';

@Component({
  selector: 'club-header',
  template: `
  <header>
    <div class="image-container">
      <loading-img class="club-image" [src]="clubModel.image"></loading-img>
      <h1 #clubName ion-fixed class="club-name">
        <ion-icon name="flag" item-left></ion-icon> &nbsp;{{clubModel._?.name}}
      </h1>
    </div>

    <buckets>
      <div>
        <dd>200</dd>
        <dt>Players</dt>
      </div>
      <div>
        <dd>50</dd>
        <dt>Matches</dt>
      </div>
      <div>
        <dd>3</dd>
        <dt>Socials</dt>
      </div>
    </buckets>
  </header>
  `
})
export class ClubHeaderCom {
  @Input() clubModel: any;
}
