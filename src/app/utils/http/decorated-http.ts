import {Injectable, EventEmitter} from '@angular/core';
import {Http} from '@angular/http';
import {Toast} from 'ionic-angular';
import {AuthHttp} from './auth-http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/cache';
import {Observable} from 'rxjs';

@Injectable()
export class DecHttp extends AuthHttp{	

	onMessage = new EventEmitter();

	constructor(http: Http){ super(http); }

	get(url:string, optionsArg:Object = {}) {
		return this._get(url, optionsArg)
			.do(this.checkMessage)
			.map(this.extractData)
			.catch(this.handleError)
			.cache();
	}

	post(url:string, data:any, optionsArg:Object = {}) {
		return this._post(url, data, optionsArg)
			.do(this.checkMessage)
			.map(this.extractData)
			.cache();
	}

	put(url:string, data:any, optionsArg:Object = {}) {
		return this._put(url, data, optionsArg)
			.do(this.checkMessage)
			.map(this.extractData)
			.cache();	
	}

	delete(url:string, optionsArg:Object = {}) {
		return this._delete(url, optionsArg)
			.do(this.checkMessage)
			.map(this.extractData)
			.cache();
	}

	private extractData(res) {
		let body = res.json().data;
    	return body || { };
	}

	private checkMessage = (res) => {
		let message = res.json().message;
		if(message && message.length > 0){
			this.onMessage.emit(message);
		}
 	}

 	private handleError = (error) => {
 		this.checkMessage(error);
		return Observable.throw('An error occurred');		
	}

}