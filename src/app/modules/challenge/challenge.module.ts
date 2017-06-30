import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';
import { ChallengeCom } from './challenge.component';
import { OpponentsCom } from './opponents.component';
import { AvailabilityModule } from '../availability/availability.module';
import { ChallengeTimeDate } from './challenge-time-date.component';
import { ChallengeTimeDateUtils } from './challenge-time-date.utils';

@NgModule({
  declarations: [ChallengeCom, OpponentsCom, ChallengeTimeDate],
  imports: [IonicModule, LoadingImgModule, AvailabilityModule],
  entryComponents: [ChallengeCom, ChallengeTimeDate],
  providers: [ChallengeTimeDateUtils],
  exports: [ChallengeCom]
})
export class ChallengeModule {}
