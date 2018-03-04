import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController } from 'ionic-angular';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { GameInt } from '../games.interfaces';
import { GamesSvc } from '../games/games.service';
import { UserSvc } from '../user-service';
import { GameDetailsCom } from '../games/game-details/game-details.component';

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
	template: ''
})
export class GameCardBaseCom {
	@Input()
	gameModel: any;

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
