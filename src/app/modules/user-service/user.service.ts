import {Injectable} from '@angular/core';
import {BaseService} from '../../utils/base/base.service';
import {DecHttp, HttpUtils} from '../../utils/http';
export {UserLoginInt, UserSignupInt, UserInt} from './user.interface';
import {UserLoginInt, UserSignupInt} from './user.interface';
import {BehaviorSubject} from 'rxjs';


@Injectable()
export class UserSvc extends BaseService{

	url = "user";
	//@#Refactor:0 convert into behaviour subject observable!
	private _user: any;
	private _user$;

	constructor(http: DecHttp){
		super(http);
		this._user$ = this.create$("user");
	}

	login(user:UserLoginInt){

		let request = this._get('user', {
			search: HttpUtils.urlParams(user)
		});
		request.subscribe(this.userSuccess);
		return request;

	}

	signup(user:UserSignupInt){

		let request = this._sync(user);
		request.subscribe(this.userSuccess);
		return request;

	}

	private userSuccess = user => {
		this.subjects['user'].next(user);
		this._user = user;
		this.http.token = user.token;
	}

	logout(){

	}

	syncDetails(details){
		return this._sync(details)
			.subscribe(() => this._user.details = details);
	}

	get current(){
		return this._user;
	}

	get current$(){
		return this._user$;
	}

}
