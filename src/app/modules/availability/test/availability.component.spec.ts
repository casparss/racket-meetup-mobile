import {fakeAsync, beforeEach, beforeEachProviders, describe, expect, it} from '@angular/core/testing';
import {provide} from '@angular/core';
import {customAsyncInject, TestUtils} from '../../../../test/di-exports';
import {AvailabilitySvc} from '../availability.service';
import {Promise} from 'ts-promise';
import {AvailabilityCom} from '../availability.component';
import {model} from './availability.fixture';
import {ServiceMock} from './availability.mocks';
import {DecHttp} from '../../../utils/http';

this.fixture = null;
this.instance = null;

describe('Availability component', () => {

	beforeEach(customAsyncInject({
		Component: AvailabilityCom,
		providers: [
			provide(AvailabilitySvc, {useClass: ServiceMock}),
			DecHttp
		],
		testSpecContext: this,
		detectChanges: false
	}));

	it('initialises', () => {
		expect(this.instance).not.toBeNull();
	});

	it('Updates the availability model correctly after UI interaction.', () => {

		this.fixture.detectChanges();

		let checkboxes = this.fixture.nativeElement.querySelectorAll('input');
		
		checkboxes[0].click();
		checkboxes[1].click();
		checkboxes[2].click();

		let morningModel = model.morning;

		expect(morningModel[0].v).toEqual(true);
		expect(morningModel[1].v).toEqual(true);
		expect(morningModel[2].v).toEqual(false);

	});

});