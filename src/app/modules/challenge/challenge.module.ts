import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChallengeCom } from './challenge.component';
import { ChallengeSvc } from './challenge.service';

@NgModule({
  declarations: [ChallengeCom],
  imports: [IonicModule],
  entryComponents: [ChallengeCom],
  exports:[ChallengeCom],
  providers: [ChallengeSvc]
})
export class ChallengeModule {}
