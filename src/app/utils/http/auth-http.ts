import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpInt } from './http.interface';

@Injectable()
export class AuthHttp {

	private _token: string = "";

	constructor(private http: Http){}

	protected _get({ url, opts }:HttpInt) {
		this.appendAuthHeader(opts);
		return this.http.get(url, opts);
	}

	protected _post({ url, data, opts }:HttpInt) {
		this.appendAuthHeader(opts);
		return this.http.post(url, data, opts);
	}

	protected _put({ url, data, opts }:HttpInt) {
		this.appendAuthHeader(opts)
		return this.http.put(url, data, opts);
	}

	protected _delete({ url, opts }:HttpInt) {
		this.appendAuthHeader(opts);
		return this.http.delete(url, opts);
	}

	private appendAuthHeader(opts: any) {
		if(this.isSet()){
			if( !(opts.headers instanceof Headers) ){
				opts.headers = new Headers();
			}

			opts.headers.append('x-auth', this._token);
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
