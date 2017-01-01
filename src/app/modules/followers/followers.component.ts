import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfileMainCom} from '../profile-main/profile-main.component';
import {UserInt} from '../user-service/user.interface';
import {debounce} from 'lodash';
import {UserSvc} from '../user-service/user.service';

@Component({
	templateUrl:"./followers.view.html"
})
export class FollowersCom{

	private selectedSegment = "friends";
	private followers$: any;
  private followed$: any;

	constructor(
		private nav: NavController,
		private userSvc: UserSvc
	){
    let followersFactory = this.userSvc.followersFactory(null).get();
    this.followers$ = followersFactory.followers$;
    this.followed$ = followersFactory.followed$;
  }

	openProfile(user){
		this.nav.push(ProfileMainCom, {user: user});
	}

}
