import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { UserInt } from '../user-service/user.interface';
import { UserSvc } from '../user-service/user.service';
import { ChallengeSvc } from './challenge.service';

@Component({
	templateUrl: './challenge.view.html'
})
export class ChallengeCom{

	private challenger: UserInt;
  private challengee: UserInt;
  private challengeForm:FormGroup;
	private formModel = {
		date: [new Date().toJSON().slice(0,10), [<any>Validators.required]],
		time: ['', [<any>Validators.required]],
    venue: ['', [<any>Validators.required]]
	};

	constructor(
    private viewCtrl: ViewController,
    private challengeSvc: ChallengeSvc,
    formBuilder: FormBuilder,
    userSvc: UserSvc
  ){
    this.challengeForm = formBuilder.group(this.formModel);
    this.challenger = userSvc.current;
		this.challengee = viewCtrl.data.user.source.getValue();
	}

	challenge(challengeDetails, isValid:boolean){
    if(isValid){
      this.challengeSvc.challenge(challengeDetails, this.challengee)
        .subscribe(() => this.viewCtrl.dismiss());
    }
  }

}
