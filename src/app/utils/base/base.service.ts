import {DecHttp, HttpUtils} from '../http';
import { ConfigSvc } from '../../modules/config/config.service';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import '../custom-rx-operators/debounce-leading';

const mergeArguments = (verb, args) => [verb, ...Array.prototype.slice.call(args, 0) ]

export class BaseService {

	public url:string;
	public baseUrl: string;
  public inFlight$: Observable<boolean>;
	public model:any;
	public subjects: Object = {};

	constructor(protected http: DecHttp, configSvc: ConfigSvc){
		this.baseUrl = configSvc.get('baseUrl');
    this.inFlight$ = <Observable<boolean>>this.create$('inFlight')
      .debounceLeading(1000);
  }

	_get(observableKey?:string, opts = {}, url?:string, params?:string){
    this.isInFlight();
		let request = this.http.get({
			url: this.generateUrl(url, params), opts
		})
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

  private httpWrapper(verb:string, data: any, opts: Object = {}, url?:string, params?:string){
		this.isInFlight();
		let request = this.http[verb]({url: this.generateUrl(url, params), data, opts});
		request.subscribe(() => this.notInflight());
		return request;
	}

	_sync(data: any, opts: Object = {}, url?:string, params?:string){
		return this.httpWrapper.apply(this, mergeArguments("post", arguments));
	}

	_update(data: any, opts: Object = {}, url?:string, params?:string){
		return this.httpWrapper.apply(this, mergeArguments("put", arguments));
	}

  _delete(data: any, opts: Object = {}, url?:string, params?:string){
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

  generateUrl(url: string, params:string = ""){
		if(!url && !this.url){
			throw new Error("No url property has been set for request.");
		}
    return `${this.baseUrl}${url ? url : this.url}${params}`
  }

}
