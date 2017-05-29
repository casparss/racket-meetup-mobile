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

const transformUser$ = user => new BehaviorSubject(user).asObservable();
const profileImage = (url, id) => `${url}${id}.jpeg`;

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

		//User
		this.subjects['user'] = new BehaviorSubject({});
		this._user$ = <Observable<any>>this.subjects['user'].asObservable();
		this._user$.subscribe(user => this._user = user);

		//searchedPlayers
		this.searchedPlayers$ = <Observable<any>>this.create$('searchedPlayers')
			.map((users: any) => users.map(transformUser$));

		//Profile image
		this.subjects['profileImage'] = new BehaviorSubject('default');
		this._profileImage$ = this.subjects['profileImage'].asObservable()
			.map(obj => {
				const url = this.configSvc.get('imageUrl');
				const imagePath = profileImage(url, obj.id);

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
      .find(userId => user.source.getValue()._id === userId);
  }

  doesFollow(user){
    return !!this._user.followers.followingThem
      .find(userId => user.source.getValue()._id === userId);
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
        this.getFollowers(userId)
					.map(({followingMe, followingThem}) => {
						return {
							followingMe: followingMe.map(transformUser$),
							followingThem: followingThem.map(transformUser$)
						};
					})
					.subscribe(({followingThem, followingMe}:any) => {
	          followingSubject.next(followingThem);
	          followersSubject.next(followingMe);
	        });
        return exports;
      }
    }
    return exports;
  }

	updateDetails(details, isValid: boolean, requestType: string){
		if(isValid){
			let request = this._update(details, {
				search: HttpUtils.urlParams({
					requestType: requestType
				})
			})
			.map(user => user.details);

			request.subscribe(details => {
				let user = this.current;
				user.details = details;
				this.current = user;
			});

			return request;
		}
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

	generateProfileImage(user: any){
		const url = this.configSvc.get('imageUrl');
		return profileImage(url, user.source.getValue()._id);
	}

	get profileImage() {
		return this._profileImage$;
	}

  search(searchTerm:string){
		const opts = {
			search: HttpUtils.urlParams({
				searchTerm: searchTerm
			})
		};
		return this._get('searchedPlayers', opts, this.searchUrl);
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
