import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RankingsCom } from './rankings.component';
import { RankingsHeaderCom } from './rankings-header.component';
import { RankingsListCom } from './rankings-list.component';
import { RankingAvatarCom } from './ranking-avatar.component';
import { RankingsSvc } from './rankings.service';
import { LoadingImgModule } from '../../utils/loading-img';
import { NoDataMessageModule } from '../no-data-message';

@NgModule({
  declarations: [RankingsCom, RankingsHeaderCom, RankingsListCom, RankingAvatarCom],
  entryComponents: [RankingsCom],
  imports: [IonicModule, LoadingImgModule, NoDataMessageModule],
  exports:[RankingsCom],
  providers: [RankingsSvc]
})
export class RankingsModule {}
