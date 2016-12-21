import {Component} from '@angular/core';
import {Toast} from 'ionic-angular';
import {ToastCom} from '../../modules/toast/toast.component';
import {SignupFormCom} from './signup-form.component';
import {LoginFormCom} from './login-form.component';


@Component({
	template: `
	<toast></toast>
	<ion-content>
		<ion-grid>
			<ion-icon class="logo" name="tennisball"></ion-icon>
			<h1>Racket Meetup</h1>
			<ion-row>
				<ion-list padding [ngSwitch]="isToggled">
					<login-form *ngSwitchCase="true"></login-form>
					<signup-form *ngSwitchCase="false"></signup-form>
				</ion-list>
			</ion-row>

			<h6>
				<button (click)="toggle()">
					Switch to {{isToggled ? 'signup' : login}}
				</button>
			</h6>
		</ion-grid>
	</ion-content>

	`,
	selector:"welcome"
})
export class WelcomeCom{
	private isToggled: boolean = true;
	toggle(){
		this.isToggled = !this.isToggled;
	}
}
