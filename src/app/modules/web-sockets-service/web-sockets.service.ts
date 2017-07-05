import {Injectable, EventEmitter} from '@angular/core';
import * as io from 'socket.io-client';
import {UserSvc} from '../user-service/user.service';
import { ConfigSvc } from '../config/config.service';

@Injectable()
export class WsSvc{

	public socket;
	private _authenticated = false;
	public onAuthenticted = new EventEmitter();

	constructor(
		private userSvc: UserSvc,
		configSvc: ConfigSvc
	){
		this.socket = io(configSvc.get('wsUrl'));
		this.authenticate();
	}

	private authenticate(){
		this.socket.on('connect', () => {
			this.socket.emit('authentication', this.userSvc.current.user.token);
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
