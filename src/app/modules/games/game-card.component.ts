import { Component, Input } from '@angular/core';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { GameInt } from './games.interfaces';
import { GamesSvc } from './games.service';
import { UserSvc } from '../user-service';

const findUser = (side, currentUserId) =>
	side.find(({ user }) => user._id === currentUserId);

const TITLES = {
	pending: 'Challenge',
	accepted: 'Match',
	rejected: 'Match (rejected)',
	forfeit: 'Match (forfeit)',
	played: 'Match (played)'
};

@Component({
	template:`
		<ion-card [attr.status]="game.status">

		  <ion-item>
				<ion-row>
					<ion-col col-9>
						<h2>{{getTitle(game)}}</h2>
						<p>{{game.date | date : 'EEEE, d/M/y'}}</p>
					</ion-col>
					<ion-col col-3 class="menu-col">
						<button
							*ngIf="status(game, ['accepted', 'played'])"
							class="menu"
							(click)="showActionSheet(game)"
							icon-only
						>
							<ion-icon name="more"></ion-icon>
						</button>
					</ion-col>
				</ion-row>
		  </ion-item>

		  <ion-card-content>

				<ion-grid class="details">
					<ion-row>
						<ion-col width-50>
							<ion-icon name="clock"></ion-icon>
						</ion-col>
						<ion-col width-50>
							<ion-icon name="pin"></ion-icon>
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col width-50>
							{{game.date | date :'shortTime'}}
						</ion-col>
						<ion-col width-50>
							{{game.venue}}
						</ion-col>
					</ion-row>
				</ion-grid>

				<ion-list class="players">
					<ion-item>
						<ion-thumbnail item-left>
							<img [src]="userSvc.generateProfileImage(game.opponents.side1[0].user)">
						</ion-thumbnail>
						{{game.opponents.side1[0].user.details.fullName}}
					</ion-item>
					<ion-item>
						<ion-thumbnail item-left>
							<img [src]="userSvc.generateProfileImage(game.opponents.side2[0].user)">
						</ion-thumbnail>
						{{game.opponents.side2[0].user.details.fullName}}
					</ion-item>
				</ion-list>

		  </ion-card-content>

		  <ion-row *ngIf="!isGameAccepted">
		    <ion-col>
		      <button ion-button icon-left clear small (click)="acceptChallenge(game)">
		        <ion-icon name="thumbs-up"></ion-icon>
		        <div>Accept</div>
		      </button>
		    </ion-col>
		    <ion-col>
		      <button ion-button icon-left clear small (click)="rejectChallenge(game)">
		        <ion-icon name="text"></ion-icon>
		        <div>Reject</div>
		      </button>
		    </ion-col>
		  </ion-row>

		</ion-card>
  `,
	selector: 'game-card'
})
export class GameCardCom {

	@Input() gameModel: any;
	private game: any;
	private actionSheetOpts: ActionSheetOptions;
	private actionSheetActions: Array<any>;
	private isGameAccepted: any;

	constructor(
		private gamesSvc: GamesSvc,
		private userSvc: UserSvc,
		private actionSheet: ActionSheet
	){}

	ngOnInit(){
		this.configureActionSheet();
		this.gameModel.$.subscribe(game => this.gameResponse(game));
	}

	gameResponse(game) {
		this.game = game;
		this.isGameAccepted = this.isAccepted();
	}

	getTitle({ status }){
		return TITLES[status];
	}

	isAccepted(){
		let currentUserId = this.userSvc.current._id;
		let { side1, side2 } = this.game.opponents;
		let user = findUser(side1, currentUserId) || findUser(side2, currentUserId);
		return user ? user.accepted : null;
	}

	status({ status }, list){
		return !!list.find(state => state === status);
	}

	acceptChallenge({ _id }){
		this.gamesSvc.acceptChallenge(_id)
			.subscribe(game => this.gameResponse(game));
	}

	rejectChallenge({ _id }){
		this.gamesSvc.rejectChallenge(_id)
			.subscribe(game => this.gameResponse(game));
	}

	showActionSheet(game){
		this.actionSheet.show(this.actionSheetOpts)
			.then((i: number) => this.actionSheetActions[i-1].event(game));
	}

	configureActionSheet(){
		this.actionSheetActions = [{
				label: 'Cancel match',
				event: game => this.rejectChallenge(game)
			},
			{
				label: 'Change details',
				event: () => alert('Two')
			}
		];

		this.actionSheetOpts = {
		  buttonLabels: this.actionSheetActions.map(action => action.label),
			addCancelButtonWithLabel: 'Cancel',
		};
	}

}
