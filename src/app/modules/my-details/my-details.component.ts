import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { UserSvc } from '../user-service/user.service';
import { UserDetailsInt } from '../user-service/user.interface';
import { ActionSheetActionsInt } from './my-details.interface';
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
		private modalController: ModalController
	){
		this.details = this.userSvc.current.user.details;
		this.defineForm();
	}

	defineForm(){
		let u = this.details;
		this.mydetailsForm = this.formBuilder.group({
			email: [u.email, [<any>Validators.required]],
			firstName: [u.firstName, [<any>Validators.required]],
			lastName: [u.lastName, [<any>Validators.required]],
			password: [{ value: u.password, disabled: true}, [<any>Validators.required]],
			location: [u.location, [<any>Validators.required]],
			dob: [u.dob, [<any>Validators.required]]
		});
	}

	changePassword(){
		this.modalController
			.create(ChangePasswordCom)
			.present();
	}

}
