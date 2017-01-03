import {Component} from '@angular/core';
import {ToastController, NavController} from 'ionic-angular';
import {DecHttp} from '../../utils/http/';
import {ToastSvc} from './toast.service';

@Component({
	template:'',
	selector: "toast"
})
export class ToastCom{

	constructor(
		http: DecHttp,
		toastSvc: ToastSvc,
		private toastController: ToastController
	){
		http.onMessage.subscribe(
			(message:string, duration?:number) => this.showMessage(message, duration)
		);
		toastSvc.onMessage((messageObj:{message: string, duration?:number}) =>
			this.showMessage(messageObj.message, messageObj.duration)
		);
	}

	showMessage(message:string, duration:number = 3000){

    console.log(arguments);

		let notification = this.toastController.create({
			message: message,
			duration: duration
		});

		notification.present(notification);

	}

}
