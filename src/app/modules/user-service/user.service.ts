import { Injectable } from '@angular/core';
import { remove, cloneDeep } from 'lodash';
import { Subject, Observable } from 'rxjs';
import { BaseService } from '../../utils/base/base.service';
import { DecHttp, HttpUtils } from '../../utils/http';
export { UserLoginInt, UserSignupInt, UserInt } from './user.interface';
import { UserLoginInt, UserSignupInt } from './user.interface';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class UserSvc extends BaseService {

	url = "user";
  followersUrl = "followers";
  searchUrl = "user/search";
	//@#Refactor:0 convert into behaviour subject observable!
	private _user: any;
	private _user$;
  public searchedPlayers$:any;
  public followers$:any;

	constructor(http: DecHttp){
		super(http);
		this._user$ = <Observable<any>>this.create$("user");
		this._user$.subscribe(user => this._user = user);
    this.searchedPlayers$ = <Observable<any>>this.create$('searchedPlayers');
	}

	login(user:UserLoginInt){
		let request = this._get(null, {
			search: HttpUtils.urlParams(user)
		}, 'user');
		request.subscribe(this.userSuccess);
		return request;
	}

	signup(user:UserSignupInt){
		let request = this._sync(user);
		request.subscribe(this.userSuccess);
		return request;
	}

	public userSuccess = user => {
		this.current = user;
		this.http.token = user.token;
	}

	logout(){

	}

  isFollowedBy(user){
    return !!this._user.followers.followingMe
      .find(userId => user._id === userId);
  }

  doesFollow(user){
    return !!this._user.followers.followingThem
      .find(userId => user._id === userId);
  }

  toggleFollow(userId:string){
		return this._update({
			userId: userId
		}, {}, this.followersUrl)
		.do(data => {
			this.mutateCurrentUser(currentUser => {
				let { followingThem } = currentUser.followers;
				data.isFriend ?
	        followingThem.push(userId):
	        remove(followingThem, followerId => userId === followerId);
				return currentUser;
			});
    })
		.map(data => data.isFriend);
	}

  getFollowers(userId?: string){
    let userParam = userId ? "/" + userId : "";
    return this._get(null, {}, this.followersUrl + userParam);
  }

  followersFactory(userId: string){
    let followingSubject = new Subject();
    let followersSubject = new Subject();
    let exports = {
      following$: followingSubject.asObservable(),
      followers$: followersSubject.asObservable(),
      get: () => {
        this.getFollowers(userId).subscribe(data => {
          followingSubject.next(data.followingThem);
          followersSubject.next(data.followingMe);
        });
        return exports;
      }
    }
    return exports;
  }

	syncDetails(details){
		return this._sync(details)
			.subscribe(details => {
				let user = this.current;
				user.details = details;
				this.current = user;
			});
	}

  search(searchTerm:string){
		return this._get('searchedPlayers', {
			search: HttpUtils.urlParams({
				searchTerm: searchTerm
			})
		}, this.searchUrl);
	}

	mutateCurrentUser(cb){
		this.current = cb(this.current);
	}

	set current(user){
		this.subjects['user'].next(user);
	}

	get current(){
		return cloneDeep(this._user);
	}

	get current$(){
		return this._user$;
	}

}
