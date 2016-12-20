import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfileMainCom} from '../profile-main/profile-main.component';
import {UserInt} from '../user-service/user.interface';
import {debounce} from 'lodash';
import {FriendsSvc} from './friends.service';

@Component({
	templateUrl:"build/modules/friends/friends.view.html",
	providers: [FriendsSvc]
})
export class FriendsCom{

	private selectedSegment = "friends";
	private userList$: any;

	constructor(
		private nav: NavController,
		private svc: FriendsSvc
	){}

	ngOnInit(){
		this.svc.getFriends();		
		this.segmentChanged();
	}

	searchUsers(ev){
		switch(this.selectedSegment){
			case "friends": 
				this.svc.searchFriends(ev.target.value);
			break;
			case "search":
				this.svc.searchPeople(ev.target.value);
			break;
		}
	}

	openProfile(user){
		this.nav.push(ProfileMainCom, {user: user});
	}

	segmentChanged(){

		//clear input

		switch(this.selectedSegment){
			case "friends": this.userList$ = this.svc.friends$; break;
			case "search": this.userList$ = this.svc.people$; break;
		}

	}

}