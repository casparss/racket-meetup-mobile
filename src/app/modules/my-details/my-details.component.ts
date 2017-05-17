import {Component} from '@angular/core';
import {UserSvc} from '../user-service/user.service';
import {UserDetailsInt} from './my-details.interface';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
	templateUrl:'./my-details.view.html'
})
export class MydetailsCom{

	private details: UserDetailsInt;
	private mydetailsForm: FormGroup;

	constructor(private userSvc: UserSvc, private formBuilder: FormBuilder){
		this.details = this.userSvc.current.details;
		this.defineForm();
	}

	defineForm(){
		let u = this.details;
		this.mydetailsForm = this.formBuilder.group({
			email: [u.email, [<any>Validators.required]],
			username: [u.username, [<any>Validators.required]],
			firstName: [u.email, [<any>Validators.required]],
			lastName: [u.lastName, [<any>Validators.required]],
			password: [u.password, [<any>Validators.required]],
			location: [u.location, [<any>Validators.required]],
			dob: [u.dob, [<any>Validators.required]]
		});
	}

	syncDetails(details, isValid){
		if(isValid){
			this.userSvc.syncDetails(details);
		}
	}

}
