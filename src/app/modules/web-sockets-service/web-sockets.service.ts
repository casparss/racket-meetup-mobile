import { Injectable, EventEmitter } from '@angular/core';
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
		private toastSvc: ToastSvc
	){}

	init(token){
		this.token = token;
		this.socket = io(this.configSvc.get('wsUrl'), { reconnection: true, reconnectionAttempts: 10000, autoConnect: true });
		this.authenticate();
		this.setEvents();
	}

	private setEvents(){
		this.socket.on("connect_error", () => console.log("connect_error") );
		this.socket.on("connect_timeout", () => console.log("connect_timeout") );
		this.socket.on("reconnect", () => console.log("reconnect") );
		this.socket.on("reconnect_attempt", () => console.log("reconnect_attempt") );
		this.socket.on("reconnecting", () => console.log("reconnecting") );
		this.socket.on("reconnect_error", () => console.log("reconnect_error") );
		this.socket.on("reconnect_failed", () => console.log("reconnect_failed") );
		this.socket.on("connect", () => console.log("connect") );
		this.socket.on("disconnect", () => console.log("disconnect") );




		this.socket.on("connect", () => this.connected$.next(true));
		this.socket.on("reconnect", () => this.connected$.next(true));
		this.socket.on("disconnect", () => this.connected$.next(false));
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
