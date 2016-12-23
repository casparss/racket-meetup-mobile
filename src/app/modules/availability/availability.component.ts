import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {debounce} from 'lodash';
import {AvailabilitySvc} from './availability.service';


@Component({
	templateUrl: './availability.view.html',
	selector: 'availability'
})
export class AvailabilityCom {

	@Input() userId: string;
	private isInFlight: boolean = false;
  private model: Object;

	constructor(private svc: AvailabilitySvc) {
    this.model = this.svc.model;
  }

	ngOnInit(){
		this.getAvailability();
	}

	getAvailability(){
		this.svc.get(this.userId).subscribe(model => this.model = model);
	}


  ngDoCheck(){
    console.log(this.isInFlight);
  }

};
