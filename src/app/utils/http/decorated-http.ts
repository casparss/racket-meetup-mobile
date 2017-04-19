import {Injectable, EventEmitter} from '@angular/core';
import {Http} from '@angular/http';
import {Toast} from 'ionic-angular';
import {AuthHttp} from './auth-http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs';

@Injectable()
export class DecHttp extends AuthHttp{

	onMessage = new EventEmitter();

	constructor(http: Http){ super(http); }

	get(url:string, optionsArg:Object = {}) {
		return this._get(url, optionsArg)
			.do(this.checkMessage)
			.map(this.extractData)
			.catch(this.handleError);
	}

	post(url:string, data:any, optionsArg:Object = {}) {
		return this._post(url, data, optionsArg)
			.do(this.checkMessage)
			.map(this.extractData);
	}

	put(url:string, data:any, optionsArg:Object = {}) {
		return this._put(url, data, optionsArg)
			.do(this.checkMessage)
			.map(this.extractData);
	}

	delete(url:string, optionsArg:Object = {}) {
		return this._delete(url, optionsArg)
			.do(this.checkMessage)
			.map(this.extractData);
	}

	private extractData(res) {
		let body = (res._body || []).length > 0 ? res.json().data : null;
    	return body || { };
	}

	private checkMessage = (res) => {
		let message = (res._body || []).length > 0 ? res.json().message : null;
		if(message && message.length > 0){
			this.onMessage.emit(message);
		}
 	}

 	private handleError = (error) => {
 		this.checkMessage(error);
		return Observable.throw('An error occurred');
	}

}
