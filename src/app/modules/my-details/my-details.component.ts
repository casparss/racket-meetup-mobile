import { Component } from '@angular/core';
import { UserSvc } from '../user-service/user.service';
import { UserDetailsInt, ActionSheetActionsInt } from './my-details.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { Camera, CameraOptions } from '@ionic-native/camera';

const sourceTypes = {
	PHOTOLIBRARY: 0,
	CAMERA: 1,
	SAVEDPHOTOALBUM: 2
};

const BASE64PREFIX = 'data:image/jpeg;base64,';

@Component({
	templateUrl:'./my-details.view.html',
	selector: "my-details"
})
export class MydetailsCom{

	private details: UserDetailsInt;
	private mydetailsForm: FormGroup;
	private actionSheetOpts: ActionSheetOptions;
	private actionSheetActions: Array<ActionSheetActionsInt>;
	private cameraOpts: CameraOptions;

	constructor(
		private userSvc: UserSvc,
		private formBuilder: FormBuilder,
		private actionSheet: ActionSheet,
		private camera: Camera
	){
		this.details = this.userSvc.current.details;
		this.defineForm();
		this.configureActionSheet();
	}

	defineForm(){
		let u = this.details;
		this.mydetailsForm = this.formBuilder.group({
			email: [u.email, [<any>Validators.required]],
			username: [u.username, [<any>Validators.required]],
			firstName: [u.email, [<any>Validators.required]],
			lastName: [u.lastName, [<any>Validators.required]],
			password: [{ value: u.password, disabled: true}, [<any>Validators.required]],
			location: [u.location, [<any>Validators.required]],
			dob: [u.dob, [<any>Validators.required]]
		});
	}

	configureCamera(){
		this.cameraOpts = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		};
	}

	configureActionSheet(){
		this.actionSheetActions = [{
				label: 'Take photo',
				event: () => this.useCamera(sourceTypes.CAMERA)
			},
			{
				label: 'Choose from library',
				event: () => this.useCamera(sourceTypes.PHOTOLIBRARY)
			}
		];

		this.actionSheetOpts = {
		  buttonLabels: this.actionSheetActions.map(action => action.label),
			addCancelButtonWithLabel: 'Cancel',
		};
	}

	useCamera(sourceType:number){
		return this.camera.getPicture(Object.assign({}, this.cameraOpts, { sourceType }))
			.then(imageData => this.userSvc.uploadPhoto(BASE64PREFIX + imageData).toPromise())
			.then(() => console.log("Success!"))
			.catch(err => console.log(err));
	}

	showActionSheet(){
		this.actionSheet.show(this.actionSheetOpts)
			.then((i: number) => this.actionSheetActions[i-1].event());
	}

	syncDetails(details, isValid){
		if(isValid){
			this.userSvc.updateDetails(details);
		}
	}
}
