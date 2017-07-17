import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import { ConfigSvc } from '../config/config.service';
import { ToastSvc } from '../toast/toast.service';

@Injectable()
export class WsSvc{

	public socket;
	private _authenticated = false;
	public onAuthenticted = new EventEmitter();
	private token: string;

	constructor(
		private configSvc: ConfigSvc,
		private toastSvc: ToastSvc
	){}

	init(token){
		this.token = token;
		this.socket = io(this.configSvc.get('wsUrl'));
		this.authenticate();
	}

	on(eventName: string, cb){
		return this.socket.on(eventName, ({message, data}) => {
			if(message) this.toastSvc.showMessage(message);
			console.log(`Web Socket event: ${eventName}`, data);
			cb(data);
		});
	}

	emit(eventName: string, data:any){
		this.socket.emit(eventName, data);
	}

	private authenticate(){
		this.socket.on('connect', () => {
			this.socket.emit('authentication', this.token);
			this.socket.on('authenticated', () => {
				this._authenticated = true;
				this.onAuthenticted.emit(this._authenticated);
			} );
		});
	}

	get authenticated(){
		return this._authenticated;
	}

}
