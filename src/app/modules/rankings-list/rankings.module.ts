import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RankingsListCom } from './rankings-list.component';
import { RankingsSvc } from './rankings.service';
import { LoadingImgModule } from '../../utils/loading-img';
import { NoDataMessageModule } from '../no-data-message';

@NgModule({
  declarations: [RankingsListCom],
  entryComponents: [RankingsListCom],
  imports: [IonicModule, LoadingImgModule, NoDataMessageModule],
  exports:[RankingsListCom],
  providers: [RankingsSvc]
})
export class RankingsModule {}
