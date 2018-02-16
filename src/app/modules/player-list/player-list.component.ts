import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { ProfileMainCom } from '../profile-main/profile-main.component';
import { UserInt } from '../user-service/user.interface';
import { ModelSvc, USER } from '../model-service/model.service';

@Component({
  selector: 'player-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
    <ion-list *ngIf="(playerList$ | async).length > 0; else noData">
      <button
        ion-item
        *ngFor="let player of playerList$ | async"
        (click)="openProfile(player)"
      >
        <ion-avatar item-left>
          <loading-img [src]="(player.$ | async)?.details.image"></loading-img>
        </ion-avatar>
        {{(player.$ | async)?.details.fullName}}
      </button>
    </ion-list>
    <ng-template #noData>
      <no-data-message>{{noDataMessage}}</no-data-message>
    </ng-template>
  `
})
export class PlayerListCom {
  @Input() playerList$: Observable<any>;
  @Input() noDataMessage: string = "No players to display.";

	constructor(private nav: NavController){}

	openProfile(user){
		this.nav.push(ProfileMainCom, { user });
	}
}
