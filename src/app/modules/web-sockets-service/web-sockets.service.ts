import { Injectable, EventEmitter } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { ConfigSvc } from '../config/config.service';
import { ToastSvc } from '../toast/toast.service';

declare var Primus: any;

@Injectable()
export class WsSvc {
	public socket;
	private _authenticated = true;
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
			this.socket.destroy();
			this._authenticated = null;
		})
	}

	init(token){
		this.token = token;
		this.socket = Primus.connect(this.configSvc.get('wsUrl'));
		this.setEvents();
		this.authenticate();
	}

	private setEvents(){
		this.socket.on("open", () => this.connected$.next(true));
	}

	off(eventName: string){
		this.socket.off(eventName);
	}

	on(eventName: string, cb){
		return this.socket.on(eventName, (...args) => {
			console.log('Socket recieving: ', args)
			cb(...args)
		});
	}

	emit(eventName: string, payload: any, ackowledgement) {
		this.socket.send(eventName, payload, ackowledgement);
	}

	private authenticate(){
		this.socket.on('open', () => {
			this.socket.send('authentication', this.token);
			this.socket.on('authenticated', () => {
				this._authenticated = true;
				this.onAuthenticted.next(this._authenticated);
			});
		});
	}

	get authenticated(){
		return this._authenticated;
	}
}
