import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { UserSvc } from '../user-service/user.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EqualFieldsFactory } from '../../utils/custom-validators/equal-fields.validator';

@Component({
	selector: "change-password",
  template: `
	<ion-header>
		<ion-navbar>
			<ion-title>
				Change password
			</ion-title>
			<ion-buttons end>
				<button icon-only ion-button (click)="viewCtrl.dismiss()"><ion-icon name="close"></ion-icon></button>
			</ion-buttons>
		</ion-navbar>
	</ion-header>

	<ion-content>
		<form
	    [formGroup]='changePasswordForm'
	    (ngSubmit)='changePassword(changePasswordForm.value, changePasswordForm.valid)'
	    novalidate ion-list
	  >
	      <ion-item>
	        <ion-label floating>Current password (for security)</ion-label>
	        <ion-input
	          formControlName="current"
	          type="password"
	        ></ion-input>
	      </ion-item>

	      <ion-item>
	        <ion-label floating>New password</ion-label>
	        <ion-input
	          formControlName="newest"
	          type="password"
	        ></ion-input>
	      </ion-item>

	      <ion-item>
	        <ion-label floating>Confirm new password</ion-label>
	        <ion-input
	          formControlName="confirm"
	          type="password"
	        ></ion-input>
	      </ion-item>

				<div *ngIf="newestField.dirty || newestField.touched">
					<ion-item *ngIf="newestField.errors; else passwordMatch">
						<p class="validation-message" *ngIf="newestField.errors.counterpart">
							<ion-icon name="alert"></ion-icon> Passwords must match.
						</p>
					</ion-item>

					<ng-template #passwordMatch>
						<ion-item>
							<p class="validation-message success">
								<ion-icon name="checkmark"></ion-icon> Passwords match.
							</p>
						</ion-item>
					</ng-template>
				</div>

	      <ion-item>
	        <button type="submit" [disabled]="!changePasswordForm.valid" ion-button block large>Change password</button>
	      </ion-item>
	  </form>
	</ion-content>
  `
})
export class ChangePasswordCom {
	private changePasswordForm: FormGroup;
	private newestField: AbstractControl;

	constructor(
		private userSvc: UserSvc,
		private formBuilder: FormBuilder,
		private viewCtrl: ViewController,
	){
		let { validator } = new EqualFieldsFactory();
    this.changePasswordForm = this.formBuilder.group({
			current: ["", [<any>Validators.required]],
      newest: ["", [<any>Validators.required, validator('confirm')]],
      confirm: ["", [<any>Validators.required, validator('newest')]]
		});
		this.newestField = this.changePasswordForm.controls.newest;
	}

	changePassword(formValue, isValid){
		if(isValid){
			this.userSvc.updateDetails(formValue, "password")
				.subscribe(() => this.viewCtrl.dismiss())
		}
	}

}
