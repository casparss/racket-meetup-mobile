import {Component, Input} from '@angular/core';
import {debounce} from 'lodash';
import {AvailabilitySvc} from './availability.service';


@Component({
	templateUrl: './availability.view.html',
	selector: 'availability'
})
export class AvailabilityCom {

	@Input() userId: string;
	private isInFlight: boolean = false;
	public morning$: any;
	public afternoon$: any;
	public evening$: any;

	constructor(private svc: AvailabilitySvc) {

		this.morning$ = svc.morning$;
		this.afternoon$ = svc.afternoon$;
		this.evening$ = svc.evening$;
		this.setEvents();

	}

	ngOnInit(){
		this.getAvailability();
	}

	getAvailability(){
		return this.svc.get(this.userId);
	}

	setEvents(){
		this.svc.inFlightEvt
			.subscribe(isInFlight => this.debouncedSpinner(isInFlight));
	}

	ngDoCheck(){
		this.svc.diff();
	}

	debouncedSpinner = debounce(
		isInFlight => this.isInFlight = isInFlight, 1500, { leading: true }
	);

};
