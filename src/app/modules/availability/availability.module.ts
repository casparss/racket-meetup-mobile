import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {AvailabilityCom} from './availability.component';
import {AvailabilitySvc} from './availability.service';

@NgModule({
  declarations: [AvailabilityCom],
  imports: [IonicModule.forRoot(AvailabilityCom)],
  exports:[AvailabilityCom],
  providers: [AvailabilitySvc]
})
export class AvailabilityModule {}
