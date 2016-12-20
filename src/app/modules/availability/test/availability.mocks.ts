import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs';

import {model} from './availability.fixture';
import {BaseService} from "../../../utils/base/base.service";
import {Utils} from '../../../utils/util-helpers';

let subjectMock = new BehaviorSubject(model);
let observableMock$ = subjectMock.asObservable();

export class ServiceMock{

	inFlightEvt = {
		subscribe(handlerCb){
			handlerCb(this.inFlight)
		}
	}

	get(id:string):any {
		subjectMock.next(model)
		return observableMock$; // need to return some data?
	}

	sync():any {}

	diff():void {}

	debouncedSync():void {}

	get morning$(){
		return observableMock$.map((model:any) => model.morning);
	}

	get afternoon$(){
		return observableMock$.map((model:any) => model.afternoon);
	}

	get evening$(){
		return observableMock$.map((model:any) => model.evening);
	}

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