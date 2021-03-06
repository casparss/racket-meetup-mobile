import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewController } from 'ionic-angular';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { UserInt } from '../user-service/user.interface';
import { UserSvc } from '../user-service/user.service';
import { UserModel } from '../user-service/user.model';
import { GamesSvc } from '../games/games.service';
import { ClubsSvc } from '../clubs/clubs.service';
import { GAME_TYPES } from './game-types.enum';

interface formInt {
	date: Array<any>,
	club: Array<any>,
	gameType: Array<any>,
	comment?: Array<any>
}

@Component({
	templateUrl: './challenge.view.html',
	selector: 'challenge'
})
export class ChallengeCom {

	private GAME_TYPES = GAME_TYPES;
	private challenger: UserModel;
  private challengee: UserModel;
  private challengeForm:FormGroup;
	private gameModel: any;
	private game: any;
	private clubs: Array<any>;

	constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private userSvc: UserSvc,
		private gamesSvc: GamesSvc,
		private clubsSvc: ClubsSvc
  ){
		this.challenger = userSvc.current;
		this.challengee = viewCtrl.data.user;
		this.gameModel = viewCtrl.data.gameModel;
		this.game = this.gameModel ? this.gameModel.getValue() : undefined;
		this.setForm(this.game);
		this.clubsSvc.getLocalClubs().then(clubs => this.clubs = clubs);
	}

	setForm(game:any = {}){
		let form: formInt = {
			date: [game.date || '', [<any>Validators.required]],
	    club: [game.club || '', [<any>Validators.required]],
			gameType: [game.gameType || GAME_TYPES[0]]
		};

		if(this.game){
			form.comment = ['', [<any>Validators.required]];
		}

		this.challengeForm = this.formBuilder.group(form);
	}

	action(challengeDetails, isValid:boolean, $event: Event){
		$event.preventDefault();
		if(!isValid) return;

		if(this.game)
			this.amend(challengeDetails);
		else
			this.challenge(challengeDetails);
	}

	challenge(challengeDetails){
		this.gamesSvc
			.challenge(challengeDetails, this.challengee._id)
			.subscribe(game => this.viewCtrl.dismiss());
  }

	amend(challengeDetails){
		this.gamesSvc
			.updateDetails(challengeDetails, this.game._id)
			.subscribe(game => {
				this.gameModel.update(game);
				this.viewCtrl.dismiss();
			});
	}

}
