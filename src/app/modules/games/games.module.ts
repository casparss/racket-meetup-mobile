import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';

import { GamesSummaryCom } from './games-summary.component';
import { GamesSummaryItemCom } from './games-summary-item.component';
import { GamesCom } from './games.component';
import { GameCardCom } from './game-card.component';

@NgModule({
  declarations: [
    GamesCom,
    GameCardCom,
    GamesSummaryCom,
    GamesSummaryItemCom
  ],
  imports: [IonicModule, LoadingImgModule],
  exports:[GamesCom, GamesSummaryCom],
  entryComponents: [GamesCom, GamesSummaryCom]
})
export class GamesModule {}
