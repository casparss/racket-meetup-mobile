import { Component, Input } from '@angular/core';

@Component({
  selector:'rankings-list',
  template: `
  <ion-list class="ranking-board">
    <div *ngFor="let rankingModel of rankings.slice(3); let i=index;">
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
  @Input() rankings: any;
  @Input() currentUser: any;
}
