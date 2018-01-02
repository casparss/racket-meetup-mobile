import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController } from 'ionic-angular';
import { UserSvc } from '../user-service/user.service';
import { GamesSvc } from '../games/games.service';

//Components
import { ProfileMainCom } from '../profile-main/profile-main.component';
import { MydetailsCom } from '../my-details/my-details.component';
import { FollowersCom } from '../followers/followers.component';
import { SearchPlayersCom } from '../followers/search-players.component';
import { GamesCom } from '../games/games.component';

const pages: any = {
	profileMain: ProfileMainCom,
	followers: FollowersCom,
	search: SearchPlayersCom,
	games: GamesCom,

	courts: ProfileMainCom,
	settings: MydetailsCom
};

@Component({
	templateUrl: './profile-menu.view.html',
	selector: 'profile-menu'
})
export class ProfileMenuCom {
	private statusLengthsSub: Subscription;
	private user;
	private pending: number;
	private accepted: number;

	constructor(
		private nav: NavController,
		private userSvc: UserSvc,
		private gamesSvc: GamesSvc
	){
		this.user = this.userSvc.current.user;
		this.gamesSvc.getLengthsForCurrentUser();
	}

	ngOnInit(){
		const user = this.userSvc.current;
		this.statusLengthsSub = user.statusLengths$
			.subscribe(({pending, accepted}) => {
				this.pending = pending;
				this.accepted = accepted;
			});
	}

	openPage(pageName: string): void{
		this.nav.push(pages[pageName]);
	}

	ionViewDidUnload(){
		this.statusLengthsSub.unsubscribe();
	}

}
