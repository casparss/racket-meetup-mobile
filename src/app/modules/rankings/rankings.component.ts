import { Component } from '@angular/core';
import { Subscription } from 'rxjs'
import { LoadingController, NavParams } from 'ionic-angular';
import { PlayerRanking } from './rankings.interface';
import { RankingsSvc } from './rankings.service';
import { UserSvc } from '../user-service';
import { ModelSvc, RANKING } from '../model-service/model.service';

@Component({
	selector:'rankings',
	template: `
	<ion-header>
	  <ion-navbar>
	    <ion-title>Rankings</ion-title>
	  </ion-navbar>
	</ion-header>

	<ion-content>
	  <no-data-message *ngIf="(rankingsList.$ | async).length === 0">
	    No rankings yet.
	  </no-data-message>
	  <div *ngIf="(rankingsList.$ | async).length > 0">
	    <rankings-header
	      [rankings]="rankingsList.$ | async"
	      [currentUser]="userSvc.current"
	    ></rankings-header>
	    <rankings-list
	      [rankings]="rankingsList.$ | async"
	      [currentUser]="userSvc.current"
	    ></rankings-list>
	  </div>
	</ion-content>
	`
})
export class RankingsCom {
	private selectedSegment: string = 'top';
	private rankingsList: any;
	private clubId: string;

	constructor(
		private rankingSvc: RankingsSvc,
		private userSvc: UserSvc,
		private modelSvc: ModelSvc,
		private loadingCtrl: LoadingController,
		private navParams: NavParams
	){
		this.rankingsList = this.modelSvc.createCollection(RANKING);
		this.clubId = this.navParams.get('clubId');
	}

	ngOnInit(){
		this.getRankings();
	}

	ionViewWillUnload(){
		this.rankingsList.destroy();
	}

	getRankings(){
		let loading = this.loadingCtrl.create({
      content: 'Loading rankings...',
      showBackdrop: false
    });

    loading.present();

		this.rankingSvc.getRankingsByClubId(this.clubId)
			.do(() => loading.dismiss())
			.subscribe(rankings => this.rankingsList.update(rankings));
	}
}
