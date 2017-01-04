import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsController} from '../../tabs/tabs-controller.component';
import {UserSvc} from '../user-service/user.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
	template: `
	<form
		[formGroup]="loginForm"
		(ngSubmit)="login(loginForm.value, loginForm.valid)"
		novalidate
	>
		<ion-item>
			<ion-icon name="heart"></ion-icon>
			<ion-label floating>
				<ion-icon name="mail"></ion-icon>
				Email:
			</ion-label>
			<ion-input formControlName="email" type="email"></ion-input>
		</ion-item>

		<ion-item>

			<ion-label floating>
				<ion-icon name="key"></ion-icon>
				Password
			</ion-label>
			<ion-input formControlName="password" type="password"></ion-input>
		</ion-item>

		<ion-item>
			<button ion-button block large>Login</button>
		</ion-item>
	</form>

	`,
	selector:"login-form"
})
export class LoginFormCom{

	private formModel = {
		email: ['', [<any>Validators.required]],
		password: ['', [<any>Validators.required]]
	};
	private loginForm: FormGroup;

	constructor(
		private svc: UserSvc,
		private nav: NavController,
		private formBuilder: FormBuilder
	){
		this.loginForm = this.formBuilder.group(this.formModel);
	}

	login(user, isValid:boolean){
		if(isValid){
			this.svc.login(user)
				.subscribe(() => this.nav.push(TabsController));
		}
	}

}
