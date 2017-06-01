import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';
import { ChallengeCom } from './challenge.component';
import { OpponentsCom } from './opponents.component';
import { ChallengeSvc } from './challenge.service';

@NgModule({
  declarations: [ChallengeCom, OpponentsCom],
  imports: [IonicModule, LoadingImgModule],
  entryComponents: [ChallengeCom],
  exports:[ChallengeCom],
  providers: [ChallengeSvc]
})
export class ChallengeModule {}
