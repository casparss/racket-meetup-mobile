import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInt } from '../user-service/user.interface';
import { debounce, forEach } from 'lodash';
import { AvailabilitySvc } from './availability.service';
import { toPromise } from '../../utils/util-helpers';
import { AvailabilityUtils } from './availability.utils';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {
	NORMAL_CLASS,
	UNSELECTED_CLASS,
	SELECTED_CLASS
} from './class-constants';

const ANIMATION_STR = '800ms cubic-bezier(0.68, -0.55, 0.265, 1.55)';

@Component({
	templateUrl: './availability.view.html',
	selector: 'availability',
	animations: [
    trigger('daySelected', [
			state('selected', style({
				opacity: 1,
				transform: 'scale(1) rotate(0deg)'
      })),
			state('unselected', style({
				opacity: 0.4,
				transform: 'scale(0.9) rotate(15deg)'
      })),
			transition('selected <=> unselected', animate(ANIMATION_STR))
    ]),
		trigger('periodSelected', [
			state('normal', style({
        transform: 'scale(1)',
				filter: 'grayscale(0%)'
      })),
			state('selected', style({
        transform: 'scale(1.05)',
				filter: 'grayscale(0%)'
      })),
			state('unselected', style({
        transform: 'scale(0.7)',
				filter: 'grayscale(100%)'
      })),
			transition('normal <=> selected', animate(ANIMATION_STR)),
			transition('normal <=> unselected', animate(ANIMATION_STR)),
			transition('unselected <=> selected', animate(ANIMATION_STR))
    ])
  ]
})
export class AvailabilityCom {
	@Input() user: any;
	@Input() user2: any;
	@Input() selectedDay: any;
	@Input() selectedPeriod: any;
	private isInFlight: boolean = false;
  private model: any;
	private state: any;

	constructor(
		private svc: AvailabilitySvc,
		private utils: AvailabilityUtils
	){}

	ngOnInit(){
		this
			.getAvailabilityType()
			.then(model => this.model = model);
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

	updateModel(ev, i, prop) {
		const model = Object.assign({}, this.model)
		model[prop] = [...this.model[prop]]
		this.svc.debouncedSync(model)
	}

	ngOnChanges(changes){
		if(changes.selectedDay && !changes.selectedDay.firstChange){
			this.daySelected();
		}
	}

	clearAnimationState(){
		forEach(this.model, period => period.forEach((day, i) => day.class = NORMAL_CLASS ));
	}

	daySelected(){
		let selectedDay = this.selectedDay.day();

		let transformFunc = period => {
			period.forEach((day, i) => {
				day.class = i === selectedDay ? NORMAL_CLASS : UNSELECTED_CLASS
			});
		};

		if(this.model){
			forEach(this.model, period => transformFunc(period))
		}
	}

	isPeriodSelected(period: string){
		const isSelectedFunc = () => this.selectedPeriod === period ? NORMAL_CLASS : UNSELECTED_CLASS;
		return this.selectedPeriod ? isSelectedFunc() : NORMAL_CLASS;
	}

	isMesh(){
		return !!this.user2;
	}

};
