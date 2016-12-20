import {Component} from '@angular/core';
import {PlayerRanking} from './rankings.interface';
import {RankingsSvc} from './rankings.service';

@Component({
	templateUrl: 'build/modules/rankings-list/rankings-list.view.html',
	selector:'rankings-list',
	providers: [RankingsSvc]
})
export class RankingListCom{

	private selectedSegment: string = 'top';
	private rankingsList$: any;

	constructor(private svc: RankingsSvc){
		this.segmentChanged();
	}

	segmentChanged(){

		switch(this.selectedSegment){
			case "top": this.rankingsList$ = this.svc.top$; break;
			case "mylevel": this.rankingsList$ = this.svc.mylevel$; break;
		}

	}

}