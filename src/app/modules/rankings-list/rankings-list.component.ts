import { Component } from '@angular/core';
import { Subscription } from 'rxjs'
import { LoadingController, NavParams } from 'ionic-angular';
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
	private rankingsListSub: Subscription;
	private currentUserRanking: any;
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
		this.rankingsListSub = this.rankingsList.$
			.subscribe(rankings => this.setCurrentUserRanking(rankings));
	}

	ngOnInit(){
		this.getRankings();
	}

	ionViewWillUnload(){
		this.rankingsListSub.unsubscribe();
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

	setCurrentUserRanking(rankings){
		this.currentUserRanking = rankings.find(ranking => ranking.user._id === this.userSvc.current._id);
	}
}
