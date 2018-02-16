import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavParams } from 'ionic-angular';
import { ClubsSvc } from './clubs.service';
import { UserInt } from '../user-service/user.interface';
import { ModelSvc, USER } from '../model-service/model.service';


@Component({
  selector: 'club-player-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Players at club</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <player-list
        [playerList$]="playerCollection.$"
        no-data-message="No players at this club yet."
      ></player-list>
    </ion-content>
  `
})
export class ClubPlayerListCom {
	private playerCollection: any = new BehaviorSubject([]);

	constructor(
		private clubsSvc: ClubsSvc,
		private modelSvc: ModelSvc,
    private navParams: NavParams
	){
    this.playerCollection = this.modelSvc.createCollection(USER);
		this.clubsSvc
      .getPlayersByClubId(this.navParams.get('_id'))
			.then(players => this.playerCollection.update(players));
  }

	ngOnDestroy(){
		this.playerCollection.destroy();
	}
}
