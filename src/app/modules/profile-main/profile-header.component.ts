import { Component, Input } from '@angular/core';
import { UserSvc } from '../user-service/user.service';

@Component({
	selector:'profile-header',
	template:`
		<header>
			<div class="avatar-container">
				<loading-img
				[src]="isCurrentUser ? (userSvc.profileImage | async) : user.generateProfileImage()"
				alt=""></loading-img>

				<h1 class="playerName">
				{{(user.$ | async)?.details.fullName}}
				</h1>
			</div>

			<buckets>
				<div>
					<dd>{{(user.$ | async)?.stats.ranking}}</dd>
					<dt>Ranking</dt>
				</div>
				<div>
					<dd>{{(user.$ | async)?.stats.matchesPlayed}}</dd>
					<dt>Matches</dt>
				</div>
				<div>
					<dd>{{(user.$ | async)?.details.location}}</dd>
					<dt>Location</dt>
				</div>
			</buckets>
		</header>
	`
})
export class ProfileHeaderCom {
	@Input() user: any;
	@Input() isCurrentUser: boolean;
	constructor(private userSvc: UserSvc){}
}
