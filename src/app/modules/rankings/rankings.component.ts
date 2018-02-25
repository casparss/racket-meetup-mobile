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
	  <no-data-message *ngIf="(rankingsList.$ | async).length < 3">
	    No rankings yet.
	  </no-data-message>
	  <div *ngIf="(rankingsList.$ | async).length >= 3">
	    <rankings-header
	      [rankings]="rankingsList.$ | async"
	      [currentUser]="userSvc.current"
	    ></rankings-header>
	    <rankings-list
				[clubModel]="clubModel"
	      [rankings]="(rankingsList.$ | async).slice(3)"
	      [currentUser]="userSvc.current"
	    ></rankings-list>
	  </div>
	</ion-content>
	`
})
export class RankingsCom {
	private selectedSegment: string = 'top';
	private rankingsList: any;
	private clubModel: any;

	constructor(
		private rankingSvc: RankingsSvc,
		private userSvc: UserSvc,
		private modelSvc: ModelSvc,
		private loadingCtrl: LoadingController,
		private navParams: NavParams
	){
		this.rankingsList = this.modelSvc.createCollection(RANKING);
		this.clubModel = this.navParams.get('clubModel');
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

		this.rankingSvc.getRankingsByClubId(this.clubModel._id)
			.do(() => loading.dismiss())
			.subscribe(rankings => this.rankingsList.update(rankings));
	}
}
