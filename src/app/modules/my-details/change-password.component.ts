import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { UserSvc } from '../user-service/user.service';
import { UserDetailsInt, ActionSheetActionsInt } from './my-details.interface';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { equalFieldsValidator } from '../../utils/custom-validators/equal-fields.validator';

@Component({
	selector: "change-password",
  template: `
	<ion-header>
		<ion-navbar>
			<ion-title>
				Change password
			</ion-title>
		</ion-navbar>
	</ion-header>

	<ion-content>
		<form
	    [formGroup]='changePasswordForm'
	    (ngSubmit)='userSvc.updateDetails(changePasswordForm.value, changePasswordForm.valid)'
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

				<ion-item *ngIf="newestField.errors && (newestField.dirty || newestField.touched)">
					<p class="validation-message" *ngIf="newestField.errors.counterpart">
						<ion-icon name="alert"></ion-icon> Passwords must match.
					</p>
				</ion-item>

	      <ion-item>
	        <button type="submit" [disabled]="!changePasswordForm.valid" ion-button block large>Change password</button>
					<button (click)="viewCtrl.dismiss()" ion-button block large>Cancel</button>
	      </ion-item>
	  </form>
	</ion-content>
  `
})
export class ChangePasswordCom {

	private changePasswordForm: FormGroup;
	private confirmField: AbstractControl;
	private newestField: AbstractControl;

	constructor(
		private userSvc: UserSvc,
		private formBuilder: FormBuilder,
		private viewCtrl: ViewController,
	){
    this.changePasswordForm = this.formBuilder.group({
			current: ["", [<any>Validators.required]],
      newest: ["", [<any>Validators.required, equalFieldsValidator('confirm')]],
      confirm: ["", [<any>Validators.required, equalFieldsValidator('newest')]]
		});
		this.newestField = this.changePasswordForm.controls.newest;
	}

}
