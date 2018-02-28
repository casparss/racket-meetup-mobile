import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController, AlertController } from 'ionic-angular';
import { UserSvc } from '../user-service/user.service';
import { GamesSvc, lengthsInt } from '../games/games.service';
import { RootNavSvc } from '../welcome/root-nav.service';
import { StatusLengthsSvc } from '../games/status-lengths.service';

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
	settings: MydetailsCom
};

@Component({
	templateUrl: './profile-menu.view.html',
	selector: 'profile-menu'
})
export class ProfileMenuCom {
	private statusLengthsSub: Subscription;
	private user;
	private lengths: lengthsInt;
	private loggingOut: boolean = false;

	constructor(
		private nav: NavController,
		private userSvc: UserSvc,
		private gamesSvc: GamesSvc,
		private rootNavSvc: RootNavSvc,
		private alertCtrl: AlertController,
		private statusLengthsSvc: StatusLengthsSvc
	){
		this.user = this.userSvc.current.user;
		this.gamesSvc.getLengthsForCurrentUser();
	}

	ngOnInit(){
		const user = this.userSvc.current;
		this.statusLengthsSub = this.statusLengthsSvc
			.$({ _id: this.userSvc.current._id, by: 'user' })
			.subscribe(lengths => this.lengths = lengths);
	}

openPage(pageName: string): void{
		this.nav.push(pages[pageName], {
			model: this.userSvc.current,
			lengths: this.lengths
		});
	}

	presentLogoutConfirm() {
	  let alert = this.alertCtrl.create({
	    title: 'Confirm Logout',
	    message: 'Are you sure you want to logout?',
	    buttons: [
	      {
	        text: 'Yes log me out',
	        handler: () => this.logout()
	      },
	      {
	        text: 'No cancel',
					role: 'cancel'
	      }
	    ]
	  });
	  alert.present();
	}

	logout(){
		this.rootNavSvc.nav.popToRoot();
		this.loggingOut = true;
	}

	ionViewWillUnload() {
		if(this.loggingOut) this.userSvc.logout();
		this.statusLengthsSub.unsubscribe();
	}

}
