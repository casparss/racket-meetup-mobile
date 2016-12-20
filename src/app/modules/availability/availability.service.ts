import {Injectable, KeyValueDiffers, EventEmitter} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DecHttp} from '../../utils/http/';
import {debounce} from 'lodash';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {map} from 'lodash';
import {BaseService} from "../../utils/base/base.service.ts";
import {ColObjDifferFactory, CollectionObjectDiffer} from '../../utils/differs/collection-object-diff.ts';
import {Service} from './availability.interface.ts';
import {Utils} from '../../utils/util-helpers.ts';

@Injectable()
export class AvailabilitySvc extends BaseService implements Service {

	url = "availability";
	debouceTime = 800;
	public differ: CollectionObjectDiffer;
	private availability$:any;

	constructor(
		private colObjDifferFactory: ColObjDifferFactory,
		http: DecHttp
	){

		super(http);
		this.availability$ = this.createObservable('availability');
		this.setEvents();

	}

	setEvents(){
		this.availability$
			.subscribe(
				model => this.differ = this.colObjDifferFactory.create(model)
			);
	}

	get morning$(){
		return this.availability$.map(model => model.morning);
	}

	get afternoon$(){
		return this.availability$.map(model => model.afternoon);
	}

	get evening$(){
		return this.availability$.map(model => model.evening);
	}

	get(id: string){
		return this._getById('availability', id);
	}

	debouncedSync = debounce(() => this._update(this.model), this.debouceTime, {
		trailing: true
	});

	diff(){
		if(this.differ) this.differ.diff().then(() => this.debouncedSync());
	}

}