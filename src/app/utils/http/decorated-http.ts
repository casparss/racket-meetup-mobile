import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from './auth-http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { HttpInt } from './http.interface';

export const extractValue = (res, key) =>
	res._body ? res.json()[key] : null;

@Injectable()
export class DecHttp extends AuthHttp{

	onMessage = new EventEmitter();

	constructor(http: Http){ super(http); }

	get(httpArgs:HttpInt) {
		return this._get(httpArgs)
			.do(this.checkMessage)
			.map(this.extractData)
			.catch(this.handleError)
			.share();
	}

	post(httpArgs:HttpInt) {
		return this._post(httpArgs)
			.do(this.checkMessage)
			.map(this.extractData)
			.catch(this.handleError)
			.share();
	}

	put(httpArgs:HttpInt) {
		return this._put(httpArgs)
			.do(this.checkMessage)
			.map(this.extractData)
			.catch(this.handleError)
			.share();
	}

	delete(httpArgs:HttpInt) {
		return this._delete(httpArgs)
			.do(this.checkMessage)
			.map(this.extractData)
			.catch(this.handleError)
			.share();
	}

	private extractData(res) {
		let body = extractValue(res, "data");
    return body || { };
	}

	private checkMessage = (res) => {
		let message = extractValue(res, "message");
		if(message && message.length > 0){
			this.onMessage.emit(message);
		}
 	}

 	private handleError = (error) => {
		this.checkMessage(error);
		return Observable.throw(error);
	}

}
