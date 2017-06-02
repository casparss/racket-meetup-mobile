import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	template: `
	<ion-content>
		<ion-grid>
			<ion-row>
				<ion-col>
					<h1><ion-icon class="logo" name="tennisball"></ion-icon> Racket Meetup</h1>
					<div padding [ngSwitch]="isToggled">
						<login-form *ngSwitchCase="true"></login-form>
						<signup-form *ngSwitchCase="false"></signup-form>
					</div>
				</ion-col>
			</ion-row>
			<ion-row class="switch-btn-container" justify-content-around align-items-end>
				<ion-col>
					<button [hidden]='isKeyboardShowing === true' ion-button small (click)="toggle()">
						Switch to {{isToggled ? 'signup' : login}}
					</button>
				</ion-col>
			</ion-row>
		</ion-grid>
	</ion-content>
	`,
	selector:"welcome"
})
export class WelcomeCom{
	private isToggled: boolean = true;
	private isKeyboardShowing:boolean;
	constructor(private keyboard: Keyboard, private _ngZone: NgZone ){
		this.toggleSignupVisibility();
	}

	toggleSignupVisibility(){
		let { onKeyboardShow, onKeyboardHide } = this.keyboard;

		onKeyboardShow()
			.subscribe(e => { console.log("Show");
				this._ngZone.run(() => this.isKeyboardShowing = true)});

		onKeyboardHide()
			.subscribe(e => {
				let type = document.activeElement['type'];
				if(type === "password" || type === "email") return;

				this._ngZone.run(() => {
					setTimeout(() => this.isKeyboardShowing = false, 1000);
				});
			});
	}

	toggle(){
		this.isToggled = !this.isToggled;
	}
}
