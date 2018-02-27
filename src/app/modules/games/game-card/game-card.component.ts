import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController } from 'ionic-angular';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { GameInt } from '../games.interfaces';
import { GamesSvc } from '../games.service';
import { UserSvc } from '../../user-service';
import { GameDetailsCom } from '../game-details/game-details.component';

const findUser = (side, currentUserId) =>
	side.find(({ user }) => user._id === currentUserId);

const STATUS_TEXT = {
	pending: '',
	accepted: '',
	rejected: 'rejected',
	forfeit: 'forfeit',
	played: 'played'
};

const STATUS_COLOUR = {
	pending: '',
	accepted: '',
	rejected: 'rejected',
	forfeit: 'forfeit',
	played: 'played'
};

let BALL_STATE_COLOR_HASH = {
	pending: "primary",
	accepted: "primary",
	rejected: "grey",
	forfeit: "grey",
	played: "grey"
};

let TEXT_STATE_COLOR_HASH = {
	pending: "primary",
	accepted: "primary",
	rejected: "danger",
	forfeit: "danger",
	played: "primary"
};

@Component({
	selector: 'game-card',
	template:`
		<ion-card [attr.status]="game.status">
		<ion-list>
			<ion-item>
				<ion-icon
					name="tennisball" [color]="ballState(game)" item-left large></ion-icon>
				<h2 item-left>
					{{getTitle(game)}}
					<span
						class="status-text"
						[attr.status]="game.status"
						*ngIf="status(game, ['rejected', 'forfeit', 'played'])"
					>
						{{getStatus(game)}}
					</span>
				</h2>
				<button
					ion-button
					icon-left
					item-right
					outline
					(click)="viewGameDetails(game)"
					*ngIf="status(game, ['accepted', 'played'])">
	        <ion-icon name="more"></ion-icon>
	        View game
	      </button>

			</ion-item>
		</ion-list>
		  <games-banner [gameModel]="gameModel"></games-banner>

			<ion-item-group>
				<ion-item>
					<ion-icon name="pin" item-left large ></ion-icon>
					<h2>{{game.club.name}}</h2>
				</ion-item>
				<ion-item>
					<ion-icon item-left large name="clock"></ion-icon>
			    <h2>{{game.date | date :'shortTime'}}</h2>
					<p>{{game.date | date : 'EEEE, d/M/y'}}</p>
			  </ion-item>
		  </ion-item-group>

			<div *ngIf="status(game, ['pending']) && !isAccepted()" class="button-group">
	      <button ion-button icon-left clear small color="textGrey" (click)="acceptChallenge(game)">
	        <ion-icon name="thumbs-up" color="primary"></ion-icon>
	        Accept
	      </button>

	      <button ion-button icon-left clear small color="textGrey" (click)="rejectChallenge(game)">
	        <ion-icon name="close-circle" color="danger"></ion-icon>
	        Reject
	      </button>
		  </div>

			<div *ngIf="status(game, ['pending']) && isAccepted()" class="button-group single">
	      <button ion-button icon-left clear small (click)="rejectChallenge(game)">
	        <ion-icon name="close-circle" color="danger"></ion-icon>
	        Cancel match request
	      </button>
		  </div>

		</ion-card>
  `
})
export class GameCardCom {

	@Input() gameModel: any;
	private game: any;
	private actionSheetOpts: ActionSheetOptions;
	private actionSheetActions: Array<any>;
	private isGameAccepted: any;
	private gameModelSub: Subscription;

	constructor(
		private gamesSvc: GamesSvc,
		private userSvc: UserSvc,
		private actionSheet: ActionSheet,
		private nav: NavController
	){}

	ngOnInit(){
		this.configureActionSheet();
		this.gameModelSub = this.gameModel.$.subscribe(game => {
			this.game = game;
			this.isGameAccepted = this.isAccepted();
		});
	}

	ionViewDidUnload(){
	  this.gameModelSub.unsubscribe();
	}

	isAccepted(){
		let currentUserId = this.userSvc.current.user._id;
		let { side1, side2 } = this.game.opponents;
		let user = findUser(side1, currentUserId) || findUser(side2, currentUserId);
		return user ? user.accepted : null;
	}

	status({ status }, list){
		return !!list.find(state => state === status);
	}

	viewGameDetails(){
		this.nav.push(GameDetailsCom, { gameModel: this.gameModel });
	}

	acceptChallenge({ _id }){
		this.gamesSvc.acceptChallenge(_id)
			.subscribe(game => this.gameModel.update(game));
	}

	rejectChallenge({ _id }){
		this.gamesSvc.rejectChallenge(_id)
			.subscribe(game => this.gameModel.update(game));
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

	ballState({ status }){
		return BALL_STATE_COLOR_HASH[status];
	}

	getTitle({ status, gameType }){
		return `${gameType} ${status === 'pending' ? 'challenge' : ''}`;
	}

	getStatus({ status }){
		return STATUS_TEXT[status];
	}

	statusColorState({ status }){
		return TEXT_STATE_COLOR_HASH[status];
	}

}
