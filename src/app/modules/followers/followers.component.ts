import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfileMainCom} from '../profile-main/profile-main.component';
import {UserInt} from '../user-service/user.interface';
import {debounce} from 'lodash';
import {UserSvc} from '../user-service/user.service';

@Component({
	templateUrl:"./followers.view.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'followers'
})
export class FollowersCom {

	private selectedSegment = "following";
	private followers: any;

	constructor(private nav: NavController, private userSvc: UserSvc){
    this.followers = this.userSvc.followersFactory(null).get();
  }

	openProfile(user){
		this.nav.push(ProfileMainCom, { user });
	}

}
