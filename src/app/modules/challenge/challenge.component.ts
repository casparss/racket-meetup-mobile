import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewController } from 'ionic-angular';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { UserInt } from '../user-service/user.interface';
import { UserSvc } from '../user-service/user.service';
import { GamesSvc } from '../games/games.service';

@Component({
	templateUrl: './challenge.view.html'
})
export class ChallengeCom {

	private challenger: UserInt;
  private challengee: UserInt;
	private challenger$: Observable<UserInt>;
  private challengee$: Observable<UserInt>;
  private challengeForm:FormGroup;
	private formModel = {
		date: [new Date().toJSON().slice(0,10), [<any>Validators.required]],
		time: ['', [<any>Validators.required]],
    venue: ['', [<any>Validators.required]]
	};

	constructor(
    private viewCtrl: ViewController,
    formBuilder: FormBuilder,
    private userSvc: UserSvc,
		private gamesSvc: GamesSvc
  ){
    this.challengeForm = formBuilder.group(this.formModel);
    this.challenger = userSvc.current;
		this.challenger$ = userSvc.current$;
		viewCtrl.data.user$.subscribe(user => this.challengee = user);
		this.challengee$ = viewCtrl.data.user$;
	}

	challenge(challengeDetails, isValid:boolean){
    if(isValid){
      this.gamesSvc.challenge(challengeDetails, this.challengee)
        .subscribe(game => {
					this.gamesSvc.pushToCurrent(game);
					this.viewCtrl.dismiss();
				});
    }
  }

}
