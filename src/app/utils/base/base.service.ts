import {DecHttp, HttpUtils} from '../http';
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
		let request = this.http.get(this.setUrl(url), opts)
      .do(data => this.subjects['inFlight'].next(false));

		request.subscribe(data => {
			if(observableKey && this.subjects[observableKey]){
				this.subjects[observableKey].next(data);
			}
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
		let req = this.http.post(this.setUrl(url), model, opts);
    req.subscribe(data => this.subjects['inFlight'].next(false));
    return req;
	}

	_update(model: any, opts: Object = {}, url?:string){
		this.subjects['inFlight'].next(true);
		let req = this.http.put(this.setUrl(url), model, opts);
    req.subscribe(data => this.subjects['inFlight'].next(false));
    return req;
	}

	create$(modelName:string){
		let newSubject = new Subject();
		this.subjects[modelName] = newSubject;
		let observable$ = newSubject.asObservable();
		return observable$.do(model => this[modelName] = model);
	}

  set url(url:string){
		this._url = url;
	}

	get url(){
		return this.baseUrl + this._url;
	}

  setUrl(url: string){
    return url ? this.baseUrl + url : this.url;
  }

}
