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
	private formModel = {
		date: ['', [<any>Validators.required]],
    venue: ['', [<any>Validators.required]],
		gameType: [GAME_TYPES[0]]
	};

	constructor(
    private viewCtrl: ViewController,
    formBuilder: FormBuilder,
    private userSvc: UserSvc,
		private gamesSvc: GamesSvc
  ){
    this.challengeForm = formBuilder.group(this.formModel);
		this.challenger = userSvc.current;
		this.challengee = viewCtrl.data.user;
	}

	challenge(challengeDetails, isValid:boolean, $event: Event){
		$event.preventDefault();
		this.challengee.$.subscribe(({ _id }) => {
			if(isValid){
	      this.gamesSvc.challenge(challengeDetails, _id)
	        .subscribe(game => this.viewCtrl.dismiss());
	    }
		});

  }

}
