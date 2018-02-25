import { Component, Input } from '@angular/core';

@Component({
	selector:'rankings-header',
	template: `
  <header>
    <ion-grid>
      <ion-row>
        <ion-col width-33 *ngFor="let rankingModel of topThreePlayers; let i=index">
          <dd>
						<ranking-avatar
							[image]="rankingModel.user.avatar$ | async"
							[position]="position(i)"
						></ranking-avatar>
					</dd>
          <dt>
						<p>{{rankingModel.user._.details.fullName}}</p>
						<ion-icon name="trophy"></ion-icon> {{rankingModel.user._.stats.wins}}
					</dt>
        </ion-col>
      </ion-row>
    </ion-grid>
  </header>
  `
})
export class RankingsHeaderCom {
  @Input() rankings;
  @Input() currentUser;
	private topThreePlayers: any;
	ngOnChanges(){
		const [first, second, third] = this.rankings;
		this.topThreePlayers = [second, first, third];
	}
	position(i){
		return [2,1,3][i];
	}
}
