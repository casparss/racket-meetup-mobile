import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpInt } from './http.interface';

@Injectable()
export class AuthHttp {

	private _token: string = "";

	constructor(private http: Http){}

	protected _get({ url, opts }:HttpInt) {
		this.appendAuthHeader(opts);
		return this.http.get(url, opts).share();
	}

	protected _post({ url, data, opts }:HttpInt) {
		this.appendAuthHeader(opts);
		return this.http.post(url, data, opts).share();
	}

	protected _put({ url, data, opts }:HttpInt) {
		this.appendAuthHeader(opts)
		return this.http.put(url, data, opts).share();
	}

	protected _delete({ url, opts }:HttpInt) {
		this.appendAuthHeader(opts);
		return this.http.delete(url, opts).share();
	}

	private appendAuthHeader(optionsArg: any) {
		if(this.isSet()){

			if( !(optionsArg.headers instanceof Headers) ){
				optionsArg.headers = new Headers();
			}

			optionsArg.headers.append('x-auth', this._token);

		}
	}

	private isSet(){
		return this._token !== "";
	}

	set token(token:string){
		this._token = token;
	}

	get token(){
		return this._token;
	}

	reset(){
		this._token = "";
	}

}
