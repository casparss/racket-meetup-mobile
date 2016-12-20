import {NgModule} from '@angular/core';
import {AvailabilityCom} from './availability.component';
import {Checkbox} from 'ionic-angular';
import {AvailabilitySvc} from './availability.service';

@NgModule({
  declarations: [AvailabilityCom, Checkbox],
  exports:[AvailabilityCom],
  providers: [AvailabilitySvc]
})
export class AvailabilityModule {}
