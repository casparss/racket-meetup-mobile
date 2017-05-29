import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {UserInt} from '../user-service/user.interface';
import {debounce} from 'lodash';
import {AvailabilitySvc} from './availability.service';


@Component({
	templateUrl: './availability.view.html',
	selector: 'availability'
})
export class AvailabilityCom {

	@Input() user: any;
	private isInFlight: boolean = false;
  private model: Object;

	constructor(private svc: AvailabilitySvc) {
    this.model = this.svc.model;
  }

	ngOnInit(){
		this.getAvailability();
	}

	getAvailability(){
		this.svc.get(this.user.source.getValue()._id).subscribe(model => this.model = model);
	}

};
