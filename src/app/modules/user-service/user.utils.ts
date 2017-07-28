import { Injectable } from '@angular/core';
import { ConfigSvc } from '../config/config.service';
import { isEmpty } from 'lodash';

@Injectable()
export class UserUtils {

  constructor(private utils: ConfigSvc){}

  generateProfileImage({ _id }){
		return this.generateImageUri(_id);
	}

	generateImageUri(filename:string, isRefresh?:boolean){
    let path = `${this.utils.get('imageUrl')}${filename}.jpeg`;
    let refreshQuery = `?${new Date().getTime()}`;
    return `${path}${isRefresh ? refreshQuery : ''}`
	}

  populateExtraFields(user){
		if(!isEmpty(user)){
			user.details.image = this.generateImageUri(user._id);
		}
		return user;
	}
}
