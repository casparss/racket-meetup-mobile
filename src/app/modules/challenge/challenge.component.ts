import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewController } from 'ionic-angular';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { UserInt } from '../user-service/user.interface';
import { UserSvc } from '../user-service/user.service';
import { UserModel } from '../user-service/user.model';
import { GamesSvc } from '../games/games.service';
import { ChallengeTimeDate } from './challenge-time-date.component';
import GAME_TYPES from './game-types';

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

	constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private userSvc: UserSvc,
		private gamesSvc: GamesSvc
  ){
		this.challenger = userSvc.current;
		this.challengee = viewCtrl.data.user;
		this.gameModel = viewCtrl.data.gameModel;
		this.game = this.gameModel ? this.gameModel.getValue() : undefined;
		this.setForm(this.game);
	}

	setForm(game:any = {}){
		this.challengeForm = this.formBuilder.group({
			date: [game.date || '', [<any>Validators.required]],
	    venue: [game.venue || '', [<any>Validators.required]],
			gameType: [game.gameType || GAME_TYPES[0]],
			comment: ['', [<any>Validators.required]]
		});
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
		this.challengee.$.subscribe(({ _id }) => {
      this.gamesSvc.challenge(challengeDetails, _id)
        .subscribe(game => this.viewCtrl.dismiss());
		});
  }

	amend(challengeDetails){
		this.gamesSvc.updateDetails(challengeDetails, this.game._id)
			.subscribe(game => {
				this.gameModel.update(game);
				this.viewCtrl.dismiss();
			});
	}

}
