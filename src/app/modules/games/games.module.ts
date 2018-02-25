import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';
import { GameRecordResultModule } from '../game-record-result';
import { NoDataMessageModule } from '../no-data-message/no-data-message.module';
import { GamesBannerModule } from '../games-banner';

import { GamesSummaryCom } from './games-summary/games-summary.component';
import { GamesSummaryItemCom } from './games-summary/games-summary-item.component';
import { GamesCom } from './games.component';
import { GameCardCom } from './game-card/game-card.component';
import { GameDetailsCom } from './game-details/game-details.component';
import { GameActivityFeedCom } from './game-activity-feed/game-activity-feed.component';

@NgModule({
  declarations: [
    GamesCom,
    GameCardCom,
    GamesSummaryCom,
    GamesSummaryItemCom,
    GameDetailsCom,
    GameActivityFeedCom
  ],
  imports: [
    IonicModule,
    LoadingImgModule,
    GameRecordResultModule,
    NoDataMessageModule,
    GamesBannerModule
  ],
  exports:[
    GamesCom,
    GamesSummaryCom
  ],
  entryComponents: [
    GamesCom,
    GamesSummaryCom,
    GameDetailsCom
  ]
})
export class GamesModule {}
