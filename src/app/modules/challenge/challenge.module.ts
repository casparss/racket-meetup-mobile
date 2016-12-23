import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {ChallengeCom} from './challenge.component';

@NgModule({
  declarations: [ChallengeCom],
  imports: [IonicModule.forRoot(ChallengeCom)],
  exports:[ChallengeCom]
})
export class ChallengeModule {}
