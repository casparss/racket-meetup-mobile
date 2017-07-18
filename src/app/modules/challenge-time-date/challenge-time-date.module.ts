import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AvailabilityModule } from '../availability/availability.module';
import { ChallengeTimeDateCom } from './challenge-time-date.component';
import { ChallengeTimeDateInputCom } from './challenge-time-date-input.component';
import { ChallengeTimeDateUtils } from './challenge-time-date.utils';

@NgModule({
  declarations: [
    ChallengeTimeDateCom,
    ChallengeTimeDateInputCom
  ],
  imports: [IonicModule,  AvailabilityModule],
  entryComponents: [ChallengeTimeDateCom],
  providers: [ChallengeTimeDateUtils],
  exports: [ChallengeTimeDateInputCom]
})
export class ChallengeDateTimeModule {}
