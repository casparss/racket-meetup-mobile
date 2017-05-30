import {Injectable, KeyValueDiffers, EventEmitter} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DecHttp} from '../../utils/http/';
import {debounce} from 'lodash';
import 'rxjs/add/operator/toPromise';
import {map} from 'lodash';
import {BaseService} from "../../utils/base/base.service";
import {ColObjDifferFactory, CollectionObjectDiffer} from '../../utils/differs/collection-object-diff';
import {Service} from './availability.interface';
import {Utils} from '../../utils/util-helpers';
import { ConfigSvc } from '../config/config.service';

@Injectable()
export class AvailabilitySvc extends BaseService implements Service {

	url = "availability";
	debouceTime = 800;
	public differ: CollectionObjectDiffer;

	constructor(
		private colObjDifferFactory: ColObjDifferFactory,
		http: DecHttp,
		configSvc: ConfigSvc
	){
    super(http, configSvc);
	}

	get(id: string){
		return this._getById('availability', id)
      .do(model => this.differ = this.colObjDifferFactory.create(this.model = model));
	}

	debouncedSync = debounce(() => this._update(this.model), this.debouceTime, {
		trailing: true
	});

	diff(){
		if(this.differ) this.differ.diff().then(() => this.debouncedSync());
	}

}
