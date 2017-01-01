import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {BaseService} from '../../utils/base/base.service';
import {DecHttp, HttpUtils} from '../../utils/http';
export {UserLoginInt, UserSignupInt, UserInt} from './user.interface';
import {UserLoginInt, UserSignupInt} from './user.interface';
import {BehaviorSubject} from 'rxjs';


@Injectable()
export class UserSvc extends BaseService{

	url = "user";
  followersUrl = "followers";
	//@#Refactor:0 convert into behaviour subject observable!
	private _user: any;
	private _user$;
  public searchedPlayers$:any;
  public followers$:any;

	constructor(http: DecHttp){
		super(http);
		this._user$ = this.create$("user");
    this.searchedPlayers$ = this.create$('searchedPlayers');
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
		}, {}, this.followersUrl);
	}

  getFollowers(userId?: string){
    let userParam = userId ? "/" + userId : "";
    return this._get(null, {}, this.followersUrl + userParam);
  }

  followersFactory(userId: string){
    let followersSubject = new Subject();
    let followedSubject = new Subject();
    let exports = {
      followers$: followersSubject.asObservable(),
      followed$: followedSubject.asObservable(),
      get: () => {
        this.getFollowers(userId).subscribe(data =>{
          console.log(data);
          followersSubject.next(data.followingMe);
          followedSubject.next(data.followingThem);
        });
        return exports;
      }
    }
    return exports;
  }

	syncDetails(details){
		return this._sync(details)
			.subscribe(() => this._user.details = details);
	}

  search(searchTerm:string){
		return this._get('people', {
			search: HttpUtils.urlParams({
				searchTerm: searchTerm
			})
		});
	}

	get current(){
		return this._user;
	}

	get current$(){
		return this._user$;
	}

}
