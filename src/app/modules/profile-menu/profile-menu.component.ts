import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserSvc} from '../user-service/user.service';

//Components
import {ProfileMainCom} from '../profile-main/profile-main.component';
import {MydetailsCom} from '../my-details/my-details.component';
import {FollowersCom} from '../followers/followers.component';

const pages: any = {
	profileMain: ProfileMainCom,
	myDetails: MydetailsCom,
	followers: FollowersCom,

	courts: ProfileMainCom,
	settings: ProfileMainCom
};

@Component({
	templateUrl: './profile-menu.view.html',
	selector: 'profile-menu'
})
export class ProfileMenuCom{

	private user;

	constructor(
		private nav: NavController,
		private userSvc: UserSvc
	){
		this.user = this.userSvc.current;
	}

	openPage(pageName: string): void{
		this.nav.push(pages[pageName]);
	}

}
