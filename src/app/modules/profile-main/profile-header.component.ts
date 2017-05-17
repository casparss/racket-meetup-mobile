import {Component, Input} from '@angular/core';

@Component({
	selector:'profile-header',
	template:`
		<header>

			<img src="{{user?.details.image}}" alt="">

			<h1 class="playerName">
				{{user?.details.firstName + " " + user?.details.lastName}}
			</h1>

			<ion-grid class="playerInfo">
				<ion-row>
					<ion-col width-33>
						<dd>{{user?.stats.ranking}}</dd>
						<dt>Ranking</dt>
					</ion-col>
					<ion-col width-33>
						<dd>{{user?.stats.matchesPlayed}}</dd>
						<dt>Matches</dt>
					</ion-col>
					<ion-col width-33>
						<dd>{{user?.details.location}}</dd>
						<dt>
							Location
						</dt>
					</ion-col>
				</ion-row>
			</ion-grid>

		</header>
	`
})
export class ProfileHeaderCom{
	@Input() user: any;
	constructor(){}
}
