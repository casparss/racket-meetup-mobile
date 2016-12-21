import {NgModule} from '@angular/core';
import {AvailabilityCom} from './availability.component';
import {AvailabilitySvc} from './availability.service';

@NgModule({
  declarations: [AvailabilityCom],
  exports:[AvailabilityCom],
  providers: [AvailabilitySvc]
})
export class AvailabilityModule {}
