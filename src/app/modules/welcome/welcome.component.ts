import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { TabsController } from '../tabs/tabs-controller.component';
import { UserSvc } from '../user-service/user.service';
import { RootNavSvc } from './root-nav.service';

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
	private isKeyboardShowing: boolean;
	private isFirstTime: boolean = true;

	constructor(
		private keyboard: Keyboard,
		private _ngZone: NgZone,
		private userSvc: UserSvc,
		private nav: NavController,
		private rootNavSvc: RootNavSvc
	){
		this.toggleSignupVisibility();
		this.rootNavSvc.set(this.nav);
	}

	ngOnInit(){
		this.persistentLogin();
  }

	persistentLogin() {
		this.userSvc.persistentLogin()
      .then(user => user ? this.nav.push(TabsController) : null)
      .catch(err => console.error(err));
	}

	toggleSignupVisibility(){
		let { onKeyboardShow, onKeyboardHide } = this.keyboard;

		onKeyboardShow()
			.subscribe(e => this._ngZone.run(() => this.isKeyboardShowing = true) );

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

	ionViewDidEnter() {
		this.userSvc.loggedout();
	}

	ionViewCanEnter() {
		const check = this.userSvc.isLoggingout || this.isFirstTime
		this.isFirstTime = false;
		return check;
	}
}
