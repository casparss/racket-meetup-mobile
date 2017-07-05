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
	rejected: 'Match',
	forfeit: 'Match',
	played: 'Match'
};

const STATUS_TEXT = {
	pending: '',
	accepted: '',
	rejected: '(rejected)',
	forfeit: '(forfeit)',
	played: '(played)'
};

const STATUS_COLOUR = {
	pending: '',
	accepted: '',
	rejected: '(rejected)',
	forfeit: '(forfeit)',
	played: '(played)'
};

let BALL_STATE_COLOR_HASH = {
	pending: "yellow",
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
					(click)="acceptChallenge(game)"
					*ngIf="status(game, ['accepted', 'played'])">
	        <ion-icon name="more"></ion-icon>
	        View game
	      </button>

			</ion-item>
		</ion-list>
		  <img src="assets/images/tennis-court.jpg">

			<ion-item-group>
				<ion-item>
					<ion-icon name="pin" item-left large ></ion-icon>
					<h2>{{game.venue}}</h2>
				</ion-item>
				<ion-item>
					<ion-icon item-left large name="clock"></ion-icon>
			    <h2>{{game.date | date :'shortTime'}}</h2>
					<p>{{game.date | date : 'EEEE, d/M/y'}}</p>
			  </ion-item>
		  </ion-item-group>

			<ion-item *ngIf="status(game, ['pending']) && !isAccepted()">
	      <button ion-button icon-left item-left (click)="acceptChallenge(game)">
	        <ion-icon name="thumbs-up"></ion-icon>
	        Accept
	      </button>

				<button ion-button danger icon-left item-right outline color="primary">
	        <ion-icon name="text"></ion-icon>
	        Suggest changes
	      </button>

	      <button ion-button danger icon-left item-right color="danger" (click)="rejectChallenge(game)">
	        <ion-icon name="text"></ion-icon>
	        Reject
	      </button>
		  </ion-item>

			<ion-item *ngIf="status(game, ['pending']) && isAccepted()">
	      <button ion-button danger icon-left item-right color="danger" (click)="rejectChallenge(game)">
	        <ion-icon name="text"></ion-icon>
	        Cancel match challenge
	      </button>
		  </ion-item>

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

	isAccepted(){
		let currentUserId = this.userSvc.current.user._id;
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

	ballState({ status }){
		return BALL_STATE_COLOR_HASH[status];
	}

	getTitle({ status }){
		return TITLES[status];
	}

	getStatus({ status }){
		return STATUS_TEXT[status];
	}

	statusColorState({ status }){
		return TEXT_STATE_COLOR_HASH[status];
	}

}
