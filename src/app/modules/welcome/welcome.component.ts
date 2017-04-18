import {Component} from '@angular/core';
import {Toast} from 'ionic-angular';

@Component({
	template: `
	<ion-content>
		<ion-grid>
			<ion-icon class="logo" name="tennisball"></ion-icon>

			<h1>Racket Meetup</h1>

			<ion-list padding [ngSwitch]="isToggled">
				<login-form *ngSwitchCase="true"></login-form>
				<signup-form *ngSwitchCase="false"></signup-form>
			</ion-list>

			<h6>
				<button ion-button small (click)="toggle()">
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
		console.log("Toggle click!")
		this.isToggled = !this.isToggled;
	}
}
