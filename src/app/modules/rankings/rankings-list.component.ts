import { Component, Input } from '@angular/core';

@Component({
  selector:'rankings-list',
  template: `
  <no-data-message *ngIf="rankings.length === 0">
    Only three ranked players at the moment, as more players play games at {{clubModel._.name}} the rankings will be listed here.
  </no-data-message>
  <ion-list class="ranking-board" *ngIf="rankings.length > 0">
    <div *ngFor="let rankingModel of rankings; let i=index;">
      <ranking-avatar
        [image]="rankingModel.user.avatar$ | async"
        [position]="i + 4"
      ></ranking-avatar>
      <span class="name">{{rankingModel.user._.details.fullName}}</span>
      <span>
        <ion-icon name="trophy"></ion-icon>
        {{rankingModel.user._.stats.wins}}
      </span>
    </div>
  </ion-list>
  `
})
export class RankingsListCom {
  @Input() clubModel: any;
  @Input() rankings: any;
  @Input() currentUser: any;
}
