import { Injectable, KeyValueDiffers, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DecHttp } from '../../utils/http/';
import { debounce } from 'lodash';
import 'rxjs/add/operator/toPromise';
import { map } from 'lodash';
import { BaseService } from "../../utils/base/base.service";
import { Service } from './availability.interface';
import { Utils } from '../../utils/util-helpers';
import { ConfigSvc  } from '../config/config.service';
import { AvailabilityUtils } from './availability.utils';

@Injectable()
export class AvailabilitySvc extends BaseService implements Service {

	url = "availability";
	debouceTime = 800;

	constructor(
		http: DecHttp,
		configSvc: ConfigSvc,
		private utils: AvailabilityUtils
	){
    super(http, configSvc);
	}

	get(id: string){
		return this._getById('availability', id)
			.map(model => this.utils.mapPeriods(model))
			.map(model => this.utils.addClassPropTransform(model));
	}

	sync(model) {
		return this._update(this.utils.mapForTransport(model))
	}

	debouncedSync = debounce(model => this.sync(model).subscribe(), this.debouceTime, {
		trailing: true
	});
}
