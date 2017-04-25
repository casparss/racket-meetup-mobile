import {async, ComponentFixture} from '@angular/core/testing';
import {TestUtils} from '../../../../test';
import {AvailabilitySvc} from '../availability.service';
import {AvailabilityCom} from '../availability.component';
import {model} from './availability.fixture';
import {ServiceMock} from './availability.mocks';
import {DecHttp} from '../../../utils/http';

let fixture: ComponentFixture<AvailabilityCom> = null;
let instance: any = null;

describe('Availability component', () => {

	let providers = [
		{provide: AvailabilitySvc, useClass: ServiceMock},
		DecHttp
	];

	beforeEach(async(() => TestUtils.beforeEachCompiler([AvailabilityCom], providers).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  afterEach(() => {
    fixture.destroy();
  });

	it('initialises', () => {
		expect(this.instance).not.toBeNull();
	});

	it('Updates the availability model correctly after UI interaction.', () => {

		fixture.detectChanges();

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
