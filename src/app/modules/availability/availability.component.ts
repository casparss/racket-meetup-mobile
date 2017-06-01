
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserInt } from '../user-service/user.interface';
import { debounce } from 'lodash';
import { AvailabilitySvc } from './availability.service';
import { toPromise } from '../../utils/util-helpers';

@Component({
	templateUrl: './availability.view.html',
	selector: 'availability'
})
export class AvailabilityCom {

	@Input() user$: any;
	private isInFlight: boolean = false;
  private model: Object;

	constructor(private svc: AvailabilitySvc) {
    this.model = this.svc.model;
  }

	ngOnInit(){
		this.getAvailability();
	}

	getAvailability(){
		toPromise(this.user$)
			.then(({ _id }) => toPromise(this.svc.get(_id)))
			.then(model => this.model = model);
	}

};
