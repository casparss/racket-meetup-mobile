import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { PlayerRanking } from './rankings.interface';
import { RankingsSvc } from './rankings.service';
import { UserSvc } from '../user-service';
import { ModelSvc, RANKING } from '../model-service/model.service';

@Component({
	templateUrl: './rankings-list.view.html',
	selector:'rankings-list'
})
export class RankingsListCom {

	private selectedSegment: string = 'top';
	private rankingsList: any;
	private currentUserRanking: any;

	constructor(
		private rankingSvc: RankingsSvc,
		private userSvc: UserSvc,
		private modelSvc: ModelSvc,
		private loadingCtrl: LoadingController
	){
		this.rankingsList = this.modelSvc.createCollection(RANKING);
		this.getRankings();
		this.rankingsList.$.subscribe(rankings => this.setCurrentUserRanking(rankings));
	}

	getRankings(){
		let loading = this.loadingCtrl.create({
      content: 'Loading rankings...',
      showBackdrop: false
    });

    loading.present();

		this.rankingSvc.getRankings()
			.do(() => loading.dismiss())
			.subscribe(rankings => this.rankingsList.update(rankings));
	}

	setCurrentUserRanking(rankings){
		this.currentUserRanking = rankings.find(ranking => ranking.user._id === this.userSvc.current._id);
	}

}
