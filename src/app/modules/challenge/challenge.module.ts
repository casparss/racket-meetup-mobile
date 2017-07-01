import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';
import { ChallengeCom } from './challenge.component';
import { OpponentsCom } from './opponents.component';
import { AvailabilityModule } from '../availability/availability.module';
import { ChallengeDateTimeModule } from '../challenge-time-date';

@NgModule({
  declarations: [
    ChallengeCom,
    OpponentsCom
  ],
  imports: [
    IonicModule,
    LoadingImgModule,
    AvailabilityModule,
    ChallengeDateTimeModule
  ],
  entryComponents: [ChallengeCom],
  exports: [ChallengeCom]
})
export class ChallengeModule {}
