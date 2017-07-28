import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule } from 'ionic-angular';
import { AvailabilityCom } from './availability.component';
import { AvailabilitySvc } from './availability.service';
import { AvailabilityUtils } from './availability.utils';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [AvailabilityCom],
  imports: [IonicModule, BrowserAnimationsModule, BrowserModule],
  exports:[AvailabilityCom],
  providers: [AvailabilitySvc, AvailabilityUtils]
})
export class AvailabilityModule {}
