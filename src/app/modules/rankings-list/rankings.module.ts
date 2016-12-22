import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {RankingsListCom} from './rankings-list.component';
import {RankingsSvc} from './rankings.service';

@NgModule({
  declarations: [RankingsListCom],
  imports: [IonicModule.forRoot(RankingsListCom)],
  exports:[RankingsListCom],
  providers: [RankingsSvc]
})
export class RankingsModule {}
