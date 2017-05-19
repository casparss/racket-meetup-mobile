import {Injectable, EventEmitter} from '@angular/core';
import * as io from 'socket.io-client';
import {UserSvc} from '../user-service/user.service';
import config from '../../config.json';

@Injectable()
export class WsSvc{

	public socket = io(config[window['cordova'] ? 'device' : 'local'].wsUrl);
	private _authenticated = false;
	public onAuthenticted = new EventEmitter();

	constructor(private userSvc: UserSvc){
		this.authenticate();
	}

	private authenticate(){
		this.socket.on('connect', () => {
			this.socket.emit('authentication', this.userSvc.current.token);
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
