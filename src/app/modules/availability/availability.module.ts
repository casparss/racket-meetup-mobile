import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AvailabilityCom } from './availability.component';
import { AvailabilitySvc } from './availability.service';
import { AvailabilityUtils } from './availability.utils';

@NgModule({
  declarations: [AvailabilityCom],
  imports: [IonicModule],
  exports:[AvailabilityCom],
  providers: [AvailabilitySvc, AvailabilityUtils]
})
export class AvailabilityModule {}
