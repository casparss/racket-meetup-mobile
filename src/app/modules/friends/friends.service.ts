import {Injectable} from '@angular/core';
import {BaseService} from '../../utils/base/base.service';
import {DecHttp, HttpUtils} from '../../utils/http';
import {debounce} from 'lodash';
import {UserInt} from '../user-service/user.interface';

@Injectable()
export class FriendsSvc extends BaseService{

	url = 'user/search';

	public friends$: any;
	public people$: any;

	constructor(http:DecHttp){
		super(http);
		this.friends$ = this.createObservable('friends');
		this.people$ = this.createObservable('people');
	}

	getFriends(){
		return this._get('friends');
	}

	searchFriends(searchTerm:string){
		return this._get('friends', {
			search: HttpUtils.urlParams({
				searchTerm: searchTerm,
				friends: true
			})
		});
	}

	searchPeople(searchTerm:string){
		return this._get('people', {
			search: HttpUtils.urlParams({
				searchTerm: searchTerm
			})
		});
	}

}
