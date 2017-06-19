import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';

import { AllGamesCom } from './all-games.component';
import { GamesSummaryCom, GamesSummaryItemCom } from './games-summary.component';
import { GamesCom } from './games.component';
import { GameCardCom } from './game-card.component';

@NgModule({
  declarations: [
    GamesCom,
    GameCardCom,
    GamesSummaryCom,
    GamesSummaryItemCom,
    AllGamesCom
  ],
  imports: [IonicModule, LoadingImgModule],
  exports:[GamesCom, AllGamesCom],
  entryComponents: [AllGamesCom]
})
export class GamesModule {}
