import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInt } from '../user-service/user.interface';
import { debounce } from 'lodash';
import { AvailabilitySvc } from './availability.service';
import { toPromise } from '../../utils/util-helpers';
import { AvailabilityUtils } from './availability.utils';

@Component({
	templateUrl: './availability.view.html',
	selector: 'availability'
})
export class AvailabilityCom {

	@Input() user$: any;
	@Input() user2$: any;
	private isInFlight: boolean = false;
  private model: Object;

	constructor(
		private svc: AvailabilitySvc,
		private utils: AvailabilityUtils
	){}

	ngOnInit(){
		this.getAvailabilityType().then(model => this.model = model);
	}

	getAvailabilityType(){
		return this.isMesh() ?
			this.getAvailabilityMesh():
			this.getAvailability(this.user$);
	}

	getAvailabilityMesh(){
		return Promise.all([
			this.getAvailability(this.user$),
			this.getAvailability(this.user2$)
		])
			.then(this.utils.generateUnityObject);
	}

	getAvailability(user$){
		let get = ({ _id }) => toPromise(this.svc.get(_id));
		return user$ instanceof Observable ? toPromise(user$).then(get) : get(user$);
	}

	isMesh(){
		return !!this.user2$;
	}

};
