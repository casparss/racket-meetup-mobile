import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ProfileMainCom } from '../profile-main/profile-main.component';
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
	private isAddressBook: boolean;
	private isEmptyState: boolean;

	constructor(
		private nav: NavController,
		private followersSvc: FollowersSvc,
		private modelSvc: ModelSvc,
		private viewCtrl: ViewController
	){
		this.isAddressBook = viewCtrl.data.isAddressBook || false;
    this.followersCollection = this.modelSvc.createCollection(USER);
		this.followingCollection = this.modelSvc.createCollection(USER);

		this.followersSvc.getFollowers()
			.subscribe(({followingThem, followingMe}) => {
				this.followersCollection.update(followingMe);
				this.followingCollection.update(followingThem);
				this.checkEmptyState();
			});
  }

	checkEmptyState(){
		this.isEmptyState = this.checkLengths() ? false : true;
	}

	checkLengths(){
		return this.followersCollection.length || this.followingCollection.length;
	}

	openChat(user){
		this.viewCtrl.dismiss(user);
	}

	openProfile(user){
		this.nav.push(ProfileMainCom, { user });
	}

	ngOnDestroy(){
		this.followersCollection.destroy();
		this.followingCollection.destroy();
	}

}
