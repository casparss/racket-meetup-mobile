import {Injectable} from '@angular/core';
import {reject, forEach} from 'lodash';
import {BaseService} from '../../utils/base/base.service';
import {DecHttp} from '../../utils/http';
import {UserSvc} from '../user-service/user.service';


@Injectable()
export class MessagesSvc extends BaseService{

	url = 'inbox';
	private _chats$: any;

	constructor(http:DecHttp, private userSvc: UserSvc){
		super(http);
		this._chats$ = this.create$('chats');
	}

	get chats$(){
		return this._chats$.map(data => {
			data.forEach(chat => {
				let user = reject(chat.participants,
					(user:any) =>  user.id === this.userSvc.current._id
				);
				chat.otherUser = user[0];
			});
			return data;
		});
	}

	getChats(){
		return this._get('chats');
	}

}
