import { Injectable, EventEmitter } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { ConfigSvc } from '../config/config.service';
import { ToastSvc } from '../toast/toast.service';

@Injectable()
export class WsSvc {

	public socket;
	private _authenticated = null;
	public onAuthenticted = new BehaviorSubject(this._authenticated);
	private token: string;
	private connected$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	private reconnectCheck: any;

	constructor(
		private configSvc: ConfigSvc,
		private toastSvc: ToastSvc,
		private platform: Platform,
		private events: Events
	){
		this.events.subscribe("logout", () => {
			this.clearReconnectInterval();
			this.socket.destroy();
			this._authenticated = null;
		})
	}

	init(token){
		this.token = token;
		this.startReconnectInterval();
	}

	startReconnectInterval(){
		this.reconnectCheck = this.reconnectTimer();
	}

	clearReconnectInterval(){
		clearInterval(this.reconnectCheck);
	}

	reconnectTimer(){
		this.connect();
		return setInterval(() => {
			if(!this.socket.connected) {
				this.connected$.next(false);
				this.connect();
			}
		}, 4000);
	}

	connect(){
		if(this.socket){
			this.socket.destroy();
	    delete this.socket;
	    this.socket = null;
		}
		this.socket = io(this.configSvc.get('wsUrl'));
		this.setEvents();
		this.authenticate();
	}

	private setEvents(){
		this.socket.on("connect", () => this.connected$.next(true));
		this.socket.on("reconnect", () => this.connected$.next(true));
		this.socket.on("disconnect", () => this.connected$.next(false));
		this.platform.pause.subscribe(() => this.clearReconnectInterval());
		this.platform.resume.subscribe(() => this.startReconnectInterval());
	}

	off(eventName: string){
		this.socket.off(eventName);
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

	private authenticate(callback?){
		this.socket.on('connect', () => {
			this.socket.emit('authentication', this.token);
			this.socket.on('authenticated', () => {
				this._authenticated = true;
				this.onAuthenticted.next(this._authenticated);
				if(callback) callback();
			} );
		});
	}

	get authenticated(){
		return this._authenticated;
	}

}
