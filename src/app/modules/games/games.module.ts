import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';
import { GameRecordResultModule } from '../game-record-result';
import { NoDataMessageModule } from '../no-data-message/no-data-message.module';

import { GamesSummaryCom } from './games-summary.component';
import { GamesSummaryItemCom } from './games-summary-item.component';
import { GamesCom } from './games.component';
import { GameCardCom } from './game-card.component';
import { GameDetailsCom } from './game-details.component';
import { BannerPlayerScoreCom } from './banner-player-score.component';

@NgModule({
  declarations: [
    GamesCom,
    GameCardCom,
    GamesSummaryCom,
    GamesSummaryItemCom,
    GameDetailsCom,
    BannerPlayerScoreCom
  ],
  imports: [IonicModule, LoadingImgModule, GameRecordResultModule, NoDataMessageModule],
  exports:[GamesCom, GamesSummaryCom],
  entryComponents: [GamesCom, GamesSummaryCom, GameDetailsCom],

})
export class GamesModule {}
