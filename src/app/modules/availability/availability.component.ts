import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInt } from '../user-service/user.interface';
import { debounce, forEach } from 'lodash';
import { AvailabilitySvc } from './availability.service';
import { toPromise } from '../../utils/util-helpers';
import { AvailabilityUtils } from './availability.utils';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

const DISABLED_CLASS = 'small';
const NORMAL_CLASS = 'normal';

@Component({
	templateUrl: './availability.view.html',
	selector: 'availability',
	animations: [
    trigger('selectionAnimation', [
			state('normal', style({
          transform: 'scale(1)',
      })),
			state('small', style({
          transform: 'scale(0.3)',
      })),
			transition('normal <=> small', animate('800ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'))
    ])
  ]
})
export class AvailabilityCom {

	@Input() user: any;
	@Input() user2: any;
	@Input() selectedDay: any;
	private isInFlight: boolean = false;
  private model: any;
	private state: any;

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
			this.getAvailability(this.user.$);
	}

	getAvailabilityMesh(){
		return Promise.all([
			this.getAvailability(this.user.$),
			this.getAvailability(this.user2.$)
		])
			.then(this.utils.generateUnityObject);
	}

	getAvailability(user$){
		let get = ({ _id }) => toPromise(this.svc.get(_id));
		return user$ instanceof Observable ? toPromise(user$).then(get) : get(user$);
	}

	isMesh(){
		return !!this.user2;
	}

	ngOnChanges(changes){
		if(changes.selectedDay && !changes.selectedDay.firstChange)
			this.daySelected()
	}

	clearAnimationState(){
		forEach(this.model, period => period.forEach((day, i) => day.class = NORMAL_CLASS ));
	}

	daySelected(){
		let selectedDay = this.selectedDay.day();

		let transformFunc = period => {
			period.forEach((day, i) => {
				day.class = i === selectedDay ? NORMAL_CLASS : DISABLED_CLASS
			});
		};

		if(this.model){
			forEach(this.model, period => transformFunc(period))
		}
	}

};
