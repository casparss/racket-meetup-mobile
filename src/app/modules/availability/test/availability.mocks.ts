import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs';

import {availabilityFixture} from './availability.fixture';
import {BaseService} from "../../../utils/base/base.service";
import {Utils} from '../../../utils/util-helpers';

let subjectMock = new BehaviorSubject(availabilityFixture);
let observableMock$ = subjectMock.asObservable();

export class UserMock {
	public _id: string = "12345";
}

export class ServiceMock{

	inFlightEvt = {
		subscribe(handlerCb){
			handlerCb(this.inFlight)
		}
	}

	get(id:string):any {
		subjectMock.next(availabilityFixture)
		return observableMock$; // need to return some data?
	}

	sync():any {}

	diff():void {}

	debouncedSync():void {}

	inFlight: boolean = true;

}

export class HttpMock{
	get(){}
}

export class ColObjDifferFactoryMock{
	attachDiffers(){}
	create(one:any, two:any){
		return new CollectionObjectDifferMock();
	}
}

export class CollectionObjectDifferMock{

	attachDiffers(){}

	diff(){
		return Utils.observable.success({mock:"hello"});
	}

}

export class DecHttpMock {

}
