import { Component, Input } from '@angular/core';
import { UserSvc } from '../user-service/user.service';

@Component({
	selector:'profile-header',
	template:`
		<header>
			<loading-img
				[class.no-photo-avatar]="!(user.$ | async)?.details.hasPhoto"
				[src]="isCurrentUser ? (userSvc.profileImage | async) : user.generateProfileImage()"
				alt=""></loading-img>

			<h1 class="playerName">
				{{(user.$ | async)?.details.fullName}}
			</h1>

			<ion-grid class="playerInfo">
				<ion-row>
					<ion-col width-33>
						<dd>{{(user.$ | async)?.stats.ranking}}</dd>
						<dt>Ranking</dt>
					</ion-col>
					<ion-col width-33>
						<dd>{{(user.$ | async)?.stats.matchesPlayed}}</dd>
						<dt>Matches</dt>
					</ion-col>
					<ion-col width-33>
						<dd>{{(user.$ | async)?.details.location}}</dd>
						<dt>
							Location
						</dt>
					</ion-col>
				</ion-row>
			</ion-grid>
		</header>
	`
})
export class ProfileHeaderCom {
	@Input() user: any;
	@Input() isCurrentUser: boolean;
	constructor(private userSvc: UserSvc){}
}
