import {DecHttp, HttpUtils} from '../http';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import '../custom-rx-operators/debounce-leading';

export class BaseService {

	private _url: string;
	protected baseUrl: string = "/api/";
  public inFlight$: Observable<boolean>;
	public model:any;
	public subjects: Object = {};

	constructor(protected http: DecHttp){
    this.inFlight$ = <Observable<boolean>>this.create$('inFlight')
      .debounceLeading(1000);
  }

	_get(observableKey?:string, opts = {}, url?:string){
    this.subjects['inFlight'].next(true);
		let request = this.http.get(url || this.url, opts);
		request.subscribe(data => {
			if(observableKey && this.subjects[observableKey]){
				this.subjects[observableKey].next(data);
			}
			this.subjects['inFlight'].next(false);
		});

		return request;

	}

	_getById(modelName:string, id:string, url?:string){
		return this._get(modelName, {
			search: HttpUtils.urlParams({id: id})
		}, url);
	}

	_sync(model: any, opts: Object = {}, url?:string){
		this.subjects['inFlight'].next(true);
		let request = this.http.post(url || this.url, model, opts);
		request.subscribe(() => this.subjects['inFlight'].next(false));
		return request;
	}

	_update(model: any, opts: Object = {}, url?:string){
		this.subjects['inFlight'].next(true);
		let request = this.http.put(url || this.url, model, opts);
		request.subscribe(() => this.subjects['inFlight'].next(false));
		return request;
	}

	set url(url:string){
		this._url = url;
	}

	get url(){
		return this.baseUrl + this._url;
	}

	create$(modelName:string){
		let newSubject = new Subject();
		this.subjects[modelName] = newSubject;
		let observable$ = newSubject.asObservable();
		return observable$.do(model => this[modelName] = model);
	}

}
