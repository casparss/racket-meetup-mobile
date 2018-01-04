import { Injectable, EventEmitter } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastSvc {
	constructor(private toastController: ToastController){}

	showMessage(message:string, duration:number = 3000, position: string = "bottom"){
		this.toastController.create({
			position: position,
			message,
			duration,
			showCloseButton: true,
			closeButtonText: 'Ok'
		}).present();
	}
}
