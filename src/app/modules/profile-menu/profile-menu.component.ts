import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserSvc } from '../user-service/user.service';

//Components
import { ProfileMainCom } from '../profile-main/profile-main.component';
import { MydetailsCom } from '../my-details/my-details.component';
import { FollowersCom } from '../followers/followers.component';
import { SearchPlayersCom } from '../followers/search-players.component';

const pages: any = {
	profileMain: ProfileMainCom,
	followers: FollowersCom,
	search: SearchPlayersCom,

	courts: ProfileMainCom,
	settings: MydetailsCom
};

@Component({
	templateUrl: './profile-menu.view.html',
	selector: 'profile-menu'
})
export class ProfileMenuCom {

	private user;

	constructor(
		private nav: NavController,
		private userSvc: UserSvc
	){
		this.user = this.userSvc.current.user;
	}

	openPage(pageName: string): void{
		this.nav.push(pages[pageName]);
	}

}
