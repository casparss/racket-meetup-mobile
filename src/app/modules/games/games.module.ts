import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';
import { GameRecordResultModule } from '../game-record-result';
import { NoDataMessageModule } from '../no-data-message/no-data-message.module';
import { UIBlocksModule } from '../ui-blocks';
import { GameCardModule } from '../game-card/game-card.module'
import { GamesBannerModule } from '../games-banner';

import { GamesCom } from './games.component';
import { GamesSegmentCom } from './games-segment.component';
import { GamesListCom } from './games-list.component';

import { GamesSummaryCom } from './games-summary/games-summary.component';
import { GamesSummaryItemCom } from './games-summary/games-summary-item.component';
import { GameDetailsCom } from './game-details/game-details.component';
import { GameActivityFeedCom } from './game-activity-feed/game-activity-feed.component';

import { StatusLengthsSvc } from './status-lengths.service';

@NgModule({
  declarations: [
    GamesCom,
    GamesSegmentCom,
    GamesListCom,
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
    UIBlocksModule,
    GameCardModule,
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
  ],
  providers: [
    StatusLengthsSvc
  ]
})
export class GamesModule {}
