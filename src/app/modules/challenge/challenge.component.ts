import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewController, ModalController } from 'ionic-angular';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { UserInt } from '../user-service/user.interface';
import { UserSvc } from '../user-service/user.service';
import { GamesSvc } from '../games/games.service';
import { ChallengeTimeDate } from './challenge-time-date.component';

@Component({
	templateUrl: './challenge.view.html',
	selector: 'challenge'
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
		private modalController : ModalController,
    formBuilder: FormBuilder,
    private userSvc: UserSvc,
		private gamesSvc: GamesSvc
  ){
    this.challengeForm = formBuilder.group(this.formModel);
		this.challenger$ = userSvc.current$;
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

	openDateTime(){
		let dateTimeModal = this.modalController.create(ChallengeTimeDate, {
			challenger$: this.challenger$,
			challengee$: this.challengee$
		});

		dateTimeModal.onDidDismiss(data => {
			console.log(data);
   	});

		dateTimeModal.present();
	}

}
