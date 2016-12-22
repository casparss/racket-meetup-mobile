import {DecHttp, HttpUtils} from '../http';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';

export class BaseService {

	private _url: string;
	protected baseUrl: string = "/api/";
	public inFlightEvt = new EventEmitter();
	public model:any;
	public subjects: Object = {};

	constructor(protected http: DecHttp){}

	_get(observableKey?:string, opts = {}, url?:string){

		this.inFlightEvt.emit(true);
		let request = this.http.get(url || this.url, opts);
		if(observableKey){
			request.subscribe(data => {
				if(this.subjects[observableKey]){
					this.subjects[observableKey].next(data)
				} else {
					throw new Error("Subject key not found for observable.");
				}
				this.inFlightEvt.emit(false);
			});
		}
		return request;

	}

	_getById(modelName:string, id:string, url?:string){
		return this._get(modelName, {
			search: HttpUtils.urlParams({id: id})
		}, url);
	}

	_sync(model: any, opts: Object = {}, url?:string){
		this.inFlightEvt.emit(true);
		let request = this.http.post(url || this.url, model, opts);
		request.subscribe(() => this.inFlightEvt.emit(false));
		return request;
	}

	_update(model: any, opts: Object = {}, url?:string){
		this.inFlightEvt.emit(true);
		let request = this.http.put(url || this.url, model, opts);
		request.subscribe(() => this.inFlightEvt.emit(false));
		return request;
	}

	set url(url:string){
		this._url = url;
	}

	get url(){
		return this.baseUrl + this._url;
	}

	createObservable(modelName:string){
		let newSubject = new Subject();
		this.subjects[modelName] = newSubject;
		let observable$ = newSubject.asObservable();
		return observable$.do(model => this[modelName] = model);
	}

}
