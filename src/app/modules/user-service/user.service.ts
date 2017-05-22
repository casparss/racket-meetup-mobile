import { Injectable } from '@angular/core';
import { remove, cloneDeep } from 'lodash';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from '../../utils/base/base.service';
import { DecHttp, HttpUtils } from '../../utils/http';
export { UserLoginInt, UserSignupInt, UserInt } from './user.interface';
import { UserLoginInt, UserSignupInt } from './user.interface';
import { ConfigSvc } from '../config/config.service';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

@Injectable()
export class UserSvc extends BaseService {

	url = "user";
  followersUrl = "followers";
  searchUrl = "user/search";
	private _user: any;
	private _user$;
	private _profileImage$;
  public searchedPlayers$:any;
  public followers$:any;

	constructor(
		http: DecHttp,
		private configSvc: ConfigSvc,
		private transfer: Transfer,
		private file: File
	){
		super(http, configSvc);
		this.defineObservables()
	}

	defineObservables(){
		this._user$ = <Observable<any>>this.create$("user");
		this._user$.subscribe(user => this._user = user);

		this.searchedPlayers$ = <Observable<any>>this.create$('searchedPlayers');

		this.subjects['profileImage'] = new BehaviorSubject('default');
		this._profileImage$ = this.subjects['profileImage'].asObservable()
			.map(obj => {
				const url = this.configSvc.get('imageUrl');
				const imagePath = `${url}${obj.id}.jpeg`;

				return obj.refresh ?
					`${imagePath}?${new Date().getTime()}` :
					imagePath
			});
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
		this.subjects['profileImage'].next({id: user._id});
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

	updateDetails(details){
		return this._update(details)
			.subscribe(details => {
				let user = this.current;
				user.details = details;
				this.current = user;
			});
	}

	uploadPhoto(imageUri: string){
		let fileTransfer: TransferObject = this.transfer.create();

		let options: FileUploadOptions = {
	     fileKey: 'image',
	     fileName: this._user._id,
	     headers: { 'x-auth': this.http.token },
			 httpMethod: "PUT"
	  };

	  return fileTransfer.upload(
				imageUri,
				this.configSvc.get('baseUrl') + 'user',
				options
			)
	   .then(() => this.refreshProfileImage())
		 .catch(console.log);
	}

	refreshProfileImage(){
		this.subjects['profileImage']
			.next({
				id: this._user._id,
				refresh: true
			});
	}

	get profileImage() {
		return this._profileImage$;
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
