import {Component} from '@angular/core';
import {PlayerRanking} from './rankings.interface';
import {RankingsSvc} from './rankings.service';

@Component({
	templateUrl: './rankings-list.view.html',
	selector:'rankings-list'
})
export class RankingsListCom {

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
