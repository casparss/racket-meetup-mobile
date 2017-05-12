import {DecHttp, HttpUtils} from '../http';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import '../custom-rx-operators/debounce-leading';

const mergeArguments = (verb, args) => [verb, ...Array.prototype.slice.call(args, 0) ]

export class BaseService {

	private _url: string;
	protected baseUrl: string = window['cordova']  ? "http://192.168.1.133:3000/api/" : "/api/";
  public inFlight$: Observable<boolean>;
	public model:any;
	public subjects: Object = {};

	constructor(protected http: DecHttp){
    this.inFlight$ = <Observable<boolean>>this.create$('inFlight')
      .debounceLeading(1000);
  }

	_get(observableKey?:string, opts = {}, url?:string, params?:string){
    this.isInFlight();
		let request = this.http.get(this.generateUrl(url, params), opts)
      .do(data => this.notInflight());

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

  private httpWrapper(verb:string, model: any, opts: Object = {}, url?:string, params?:string){
		this.isInFlight();
		let req = this.http[verb](this.generateUrl(url, params), model, opts);
    req.subscribe(data => this.notInflight());
    return req;
	}

	_sync(model: any, opts: Object = {}, url?:string, params?:string){
		return this.httpWrapper.apply(this, mergeArguments("post", arguments));
	}

	_update(model: any, opts: Object = {}, url?:string, params?:string){
		return this.httpWrapper.apply(this, mergeArguments("put", arguments));
	}

  _delete(model: any, opts: Object = {}, url?:string, params?:string){
		return this.httpWrapper.apply(this, mergeArguments("delete", arguments));
	}

	create$(modelName:string){
		let newSubject = new Subject();
		this.subjects[modelName] = newSubject;
		let observable$ = newSubject.asObservable();
		return observable$.do(model => this[modelName] = model);
	}

	private isInFlight(){
		this.subjects['inFlight'].next(true);
	}

	private notInflight(){
		this.subjects['inFlight'].next(false);
	}

  //URL stuff

  set url(url:string){
		this._url = url;
	}

	get url(){
		return this.generateUrl(this._url);
	}

  generateUrl(url: string, params:string = ""){
    return `${this.baseUrl}${url}${params}`
  }

  //This is a bit crap, but wasn't sure how to cast all args to string
  params(a1:string,a2?:string,a3?:string,a4?:string,a5?:string,a6?:string){
    let segments:string = "";
    [].slice.call(arguments)
      .forEach((seg:string) => segments+= "/" + seg);
    return segments;
  }

}
