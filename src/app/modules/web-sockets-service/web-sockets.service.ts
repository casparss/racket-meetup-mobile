import { Injectable, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { ConfigSvc } from '../config/config.service';
import { ToastSvc } from '../toast/toast.service';

@Injectable()
export class WsSvc{

	public socket;
	private _authenticated = false;
	public onAuthenticted = new EventEmitter();
	private token: string;
	private connected$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(
		private configSvc: ConfigSvc,
		private toastSvc: ToastSvc,
		private platform: Platform
	){}

	init(token){
		this.token = token;
		this.connect();
	}

	connect(){
		this.socket = io(this.configSvc.get('wsUrl'));
		this.setEvents();
		this.authenticate();
	}

	private setEvents(){
		this.socket.on("connect", () => this.connected$.next(true));
		this.socket.on("reconnect", () => this.connected$.next(true));
		this.socket.on("disconnect", () => this.connected$.next(false));
		this.platform.pause.subscribe(() => this.socket.disconnect());
		this.platform.resume.subscribe(() => this.connect());
		this.connected$.subscribe(console.log);
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
