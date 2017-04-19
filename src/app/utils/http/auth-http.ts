import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class AuthHttp {

	private _token: string = "";

	constructor(private http: Http){}

	protected _get(url:string, optionsArg?:Object) {
		this.appendAuthHeader(optionsArg);
		return this.http.get(url, optionsArg).share();
	}

	protected _post(url:string, data:any, optionsArg?:Object) {
		this.appendAuthHeader(optionsArg);
		return this.http.post(url, data, optionsArg).share();
	}

	protected _put(url:string, data:any, optionsArg?:Object) {
		this.appendAuthHeader(optionsArg)
		return this.http.put(url, data, optionsArg).share();
	}

	protected _delete(url:string, optionsArg?:Object) {
		this.appendAuthHeader(optionsArg);
		return this.http.delete(url, optionsArg).share();
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
