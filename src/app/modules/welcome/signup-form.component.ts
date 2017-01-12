import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsController} from '../../tabs/tabs-controller.component';
import {UserSvc} from '../user-service/user.service';

import {Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
	template: `
	<form
		[formGroup]="signupForm"
		(ngSubmit)="signup(signupForm.value, signupForm.valid)"
		novalidate
	>
		<ion-item>

			<ion-label floating>
				First name:
			</ion-label>
			<ion-input formControlName="firstName" type="text"></ion-input>
		</ion-item>

		<ion-item>
			<ion-label floating>
				Last name:
			</ion-label>
			<ion-input formControlName="lastName" type="text"></ion-input>
		</ion-item>

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
			<button ion-button block medium>Signup</button>
		</ion-item>
	</form>

	`,
	selector:"signup-form"
})
export class SignupFormCom{

	private formModel = {
		firstName: ['', [<any>Validators.required]],
		lastName: ['', [<any>Validators.required]],
		email: ['', [<any>Validators.required]],
		password: ['', [<any>Validators.required]]
	};
	private signupForm: FormGroup;

	constructor(
		private svc: UserSvc,
		private nav: NavController,
		private formBuilder: FormBuilder
	){
		this.signupForm = this.formBuilder.group(this.formModel);
	}

	signup(user, isValid:boolean){
		if(isValid){
			this.svc.signup(user)
				.subscribe(() => this.nav.push(TabsController));
		}
	}

}
