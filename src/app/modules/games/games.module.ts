import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';

import { GamesSummaryCom, GamesSummaryItemCom } from './games-summary.component';
import { GamesCom } from './games.component';
import { GameCardCom } from './game-card.component';

@NgModule({
  declarations: [GamesCom, GameCardCom, GamesSummaryCom, GamesSummaryItemCom],
  imports: [IonicModule, LoadingImgModule],
  exports:[GamesCom]
})
export class GamesModule {}
