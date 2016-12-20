import {BaseService} from '../base.service';
import {DecHttp} from '../../http';
import {Injectable} from '@angular/core';
import {ColObjDifferFactory} from '../../../utils/differs/collection-object-diff';

@Injectable()
export class ChildServiceMock extends BaseService{

	public mock$;
	url: "/hello";

	constructor(public http: DecHttp){
		super(http);
		this.mock$ = this.createObservable('mock');
	}
}