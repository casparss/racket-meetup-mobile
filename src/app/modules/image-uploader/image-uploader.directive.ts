import { Directive, HostListener } from '@angular/core';
import { UserSvc } from '../user-service/user.service';
import { ActionSheetActionsInt } from './image-uploader.interface';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

const sourceTypes = Object.freeze({
	PHOTOLIBRARY: 0,
	CAMERA: 1,
	SAVEDPHOTOALBUM: 2
});

const UPLOAD_MESSAGE = "Uploading photo";

@Directive({
	selector: "[image-uploader]"
})
export class ImageUploaderDrv {

	private actionSheetOpts: ActionSheetOptions;
	private actionSheetActions: Array<ActionSheetActionsInt>;
	private cameraOpts: CameraOptions;

	constructor(
		private userSvc: UserSvc,
		private actionSheet: ActionSheet,
		private camera: Camera,
		private spinnerDialog: SpinnerDialog,
		private crop: Crop
	){
		this.configureActionSheet();
	}

  @HostListener('click', ['$event'])
  showActionSheet(event: Event){
		this.actionSheet.show(this.actionSheetOpts)
			.then((i: number) => this.actionSheetActions[i-1].event());
	}

	configureCamera(){
		this.cameraOpts = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			allowEdit: true,
			correctOrientation: true
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
			.then(imageUri => this.crop.crop(imageUri, {quality: 100}))
			.then(imageUri => {
				this.spinnerDialog.show(UPLOAD_MESSAGE, UPLOAD_MESSAGE, true);
				return this.userSvc.uploadPhoto(imageUri);
			})
			.then(() => this.spinnerDialog.hide())
			.catch(err => {
				this.spinnerDialog.hide();
				console.log(err);
			});
	}

}
