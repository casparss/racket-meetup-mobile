import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { UserSvc } from '../user-service/user.service';
import { UserDetailsInt } from '../user-service/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangePasswordCom } from './change-password.component';

@Component({
	templateUrl:'./my-details.view.html',
	selector: "my-details"
})
export class MydetailsCom {

	private details: UserDetailsInt;
	private mydetailsForm: FormGroup;

	constructor(
		private userSvc: UserSvc,
		private formBuilder: FormBuilder,
		private modalController: ModalController,
		private nav: NavController
	){
		this.details = this.userSvc.current.user.details;
		this.defineForm();
	}

	defineForm(){
		let { email, firstName, lastName, password, location } = this.details;
		this.mydetailsForm = this.formBuilder.group({
			email: [email, [<any>Validators.required]],
			firstName: [firstName, [<any>Validators.required]],
			lastName: [lastName, [<any>Validators.required]],
			password: [{ value: password, disabled: true}, [<any>Validators.required]],
			location: [location, [<any>Validators.required]],
			//dob: [u.dob, [<any>Validators.required]]
		});
	}

	changePassword(){
		this.modalController
			.create(ChangePasswordCom)
			.present();
	}

	updateDetails(details, isValid){
		if(isValid) this.userSvc.updateDetails(details, "details")
			.subscribe(() => this.resetForm());
	}

	resetForm(){
		this.mydetailsForm.markAsPristine();
		this.mydetailsForm.markAsUntouched();
		this.mydetailsForm.updateValueAndValidity();
	}

}
