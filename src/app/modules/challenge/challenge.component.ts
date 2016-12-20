import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {UserInt} from '../user-service/user.interface';

@Component({
	templateUrl: 'build/modules/challenge/challenge.view.html'
})
export class ChallengeCom{

	private user: UserInt;
	public minDate: Date = new Date();

	date: string;
	time: string;

	constructor(private viewCtrl: ViewController){
		this.user = viewCtrl.data.user;
		this.setCurrentDate(this.date);
	}

	dateSelected(timestamp){

		console.log(timestamp);

	}

	challenge(){

	}

	close(){
		this.viewCtrl.dismiss();
	}


	private setCurrentDate(dateToday :string) :void{
		let utc = new Date().toJSON().slice(0,10);
		if (dateToday === undefined ){
			this.time = utc;
		}
	}

}