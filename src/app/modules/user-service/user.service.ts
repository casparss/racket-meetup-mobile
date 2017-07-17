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
import { UserModelSvc } from './user.model.service';
import { UserModel } from './user.model';
import { UserUtils } from './user.utils';
import { ModelSvc, USER } from '../model-service/model.service';
import { WsSvc } from '../web-sockets-service/web-sockets.service';

@Injectable()
export class UserSvc extends BaseService {

	url = "user";
  followersUrl = "followers";
  searchUrl = "user/search";
	private _profileImage$;
  public searchedPlayers$:any;
  public followers$:any;
	public current: UserModel;

	constructor(
		private utils: UserUtils,
		http: DecHttp,
		private configSvc: ConfigSvc,
		private transfer: Transfer,
		private file: File,
		private modelSvc: ModelSvc,
		private ws: WsSvc
	){
		super(http, configSvc);
		this.defineObservables()
	}

	defineObservables(){

		//@TODO: Not entirley sure searchedPlayers whyxw needs to be on the user
		//exactly, needs investigating
		//searchedPlayers
		this.searchedPlayers$ = <Observable<any>>this.create$('searchedPlayers')
			.map((users: any) => users.map(user => this.modelSvc.create(user)));

		//Profile image
		this.subjects['profileImage'] = new BehaviorSubject('default');
		this._profileImage$ = this.subjects['profileImage'].asObservable();
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
		this.ws.init(user.token);
		this.current = this.modelSvc.create(user);
		this.updateProfileImage();
		this.http.token = user.token;
	}

	logout(){

	}

	//@TODO: moveto utils class
  isFollowedBy(queriedUserId){
    return !!this.current.user.followers.followingMe
      .find(userId => queriedUserId === userId);
  }

	//@TODO: moveto utils class
  doesFollow(queriedUserId){
    return !!this.current.user.followers.followingThem
      .find(userId => queriedUserId === userId);
  }

  toggleFollow(userId:string){
		return this._update({ userId }, {}, this.followersUrl)
		.do(({ isFriend }) => this.current.toggleFollow(userId, isFriend))
		.map(({ isFriend }) => isFriend);
	}

	updateDetails(details, isValid: boolean, requestType: string){
		if(isValid){
			let search = HttpUtils.urlParams({ requestType });
			return this._update(details, { search })
				.do(({ details }) => this.current.updateDetails(details));
		}
	}

	uploadPhoto(imageUri: string){
		let fileTransfer: TransferObject = this.transfer.create();

		let options: FileUploadOptions = {
	     fileKey: 'image',
	     fileName: this.current.user._id,
	     headers: { 'x-auth': this.http.token },
			 httpMethod: "PUT"
	  };

	  return fileTransfer.upload(
				imageUri,
				this.configSvc.get('baseUrl') + 'user',
				options
			)
	   .then(() => this.updateProfileImage({ refresh: true }))
		 .catch(console.log);
	}

	//@TODO: profile image stuff should be moved to the usermodel, this might
	//dissapear with #29 anyway
	updateProfileImage(opts:any = {}){
		this.subjects['profileImage']
			.next(this.utils.generateImageUri(this.current.user._id, opts.refresh));
	}

	get profileImage() {
		return this._profileImage$;
	}

  search(searchTerm:string){
		let search = HttpUtils.urlParams({ searchTerm });
		return this._get('searchedPlayers', { search }, this.searchUrl);
	}

	fetchUserById(userId:string){
		return this._getById(null, userId);
	}

}
