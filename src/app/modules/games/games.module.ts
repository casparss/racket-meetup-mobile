import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';

import { GamesSummaryCom } from './games-summary.component';
import { GamesSummaryItemCom } from './games-summary-item.component';
import { GamesCom } from './games.component';
import { GameCardCom } from './game-card.component';
import { GameDetailsCom } from './game-details.component';


@NgModule({
  declarations: [
    GamesCom,
    GameCardCom,
    GamesSummaryCom,
    GamesSummaryItemCom,
    GameDetailsCom
  ],
  imports: [IonicModule, LoadingImgModule],
  exports:[GamesCom, GamesSummaryCom],
  entryComponents: [GamesCom, GamesSummaryCom, GameDetailsCom],

})
export class GamesModule {}
