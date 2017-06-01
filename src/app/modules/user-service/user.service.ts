import { Injectable } from '@angular/core';
import { remove, cloneDeep, isEmpty } from 'lodash';
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

		//User
		this.subjects['user'] = new BehaviorSubject({});
		this._user$ = <Observable<any>>this.subjects['user'].asObservable()
			.map(user => this.populateExtraFields(user));
		this._user$.subscribe(user => this._user = user);

		//searchedPlayers
		this.searchedPlayers$ = <Observable<any>>this.create$('searchedPlayers')
			.map((users: any) => users.map(user => this.transformUser$(user)));

		//Profile image
		this.subjects['profileImage'] = new BehaviorSubject('default');
		this._profileImage$ = this.subjects['profileImage'].asObservable()
			.map(obj => {
				const imagePath = this.generateImageUri(obj.id);

				return obj.refresh ?
					`${imagePath}?${new Date().getTime()}` :
					imagePath
			});
	}

	login(user:UserLoginInt){
		let search = HttpUtils.urlParams(user);
		return this._get(null, { search }, 'user')
			.do(this.userSuccess)
	}

	signup(user:UserSignupInt){
		return this._sync(user)
			.do(this.userSuccess);
	}

	public userSuccess = user => {
		this.subjects['profileImage'].next({id: user._id});
		this.current = user;
		this.http.token = user.token;
	}

	logout(){

	}

  isFollowedBy(queriedUserId){
    return !!this._user.followers.followingMe
      .find(userId => queriedUserId === userId);
  }

  doesFollow(queriedUserId){
    return !!this._user.followers.followingThem
      .find(userId => queriedUserId === userId);
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
							followingMe: followingMe.map(user => this.transformUser$(user)),
							followingThem: followingThem.map(user => this.transformUser$(user))
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
			let search = HttpUtils.urlParams({ requestType });
			return this._update(details, { search })
				.map(user => user.details)
				.do(details => {
					let user = this.current;
					user.details = details;
					this.current = user;
				});
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

	generateProfileImage({ _id }){
		return this.generateImageUri(_id);
	}

	private generateImageUri(filename){
		return `${this.configSvc.get('imageUrl')}${filename}.jpeg`;
	}

	get profileImage() {
		return this._profileImage$;
	}

  search(searchTerm:string){
		let search = HttpUtils.urlParams({ searchTerm });
		return this._get('searchedPlayers', { search }, this.searchUrl);
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

	private transformUser$(user){
		return new BehaviorSubject(user)
			.map(user => this.populateExtraFields(user));
	}

	private populateExtraFields(user){
		if(!isEmpty(user)){
			user.details.image = this.generateImageUri(user._id);
		}
		return user;
	}
}
