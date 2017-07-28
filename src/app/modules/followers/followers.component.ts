import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfileMainCom } from '../profile-main/profile-main.component';
import { UserInt } from '../user-service/user.interface';
import { debounce } from 'lodash';
import { FollowersSvc } from './followers.service';
import { ModelSvc, USER } from '../model-service/model.service';

@Component({
	templateUrl:"./followers.view.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'followers'
})
export class FollowersCom {

	private selectedSegment = "following";
	private followers: any;
	private followersCollection: any;
	private followingCollection: any;

	constructor(
		private nav: NavController,
		private followersSvc: FollowersSvc,
		private modelSvc: ModelSvc
	){
    this.followersCollection = this.modelSvc.createCollection(USER);
		this.followingCollection = this.modelSvc.createCollection(USER);

		this.followersSvc.getFollowers()
			.subscribe(({followingThem, followingMe}) => {
				this.followersCollection.update(followingMe);
				this.followingCollection.update(followingThem);
			});
  }

	openProfile(user){
		this.nav.push(ProfileMainCom, { user });
	}

	ngOnDestroy(){
		this.followersCollection.destroy();
		this.followingCollection.destroy();
	}

}
