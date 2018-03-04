import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';
import { UIBlocksModule } from '../ui-blocks';
import { GamesBannerModule } from '../games-banner';

import { GameCardBaseCom } from './game-card-base.component';
import { GameCardFullCom } from './game-card-full.component';
import { GameCardPreviousCom } from './game-card-previous.component';

import { CardElButtonsCom } from './card-el-buttons.component';
import { CardElClubNameCom } from './card-el-club-name.component';
import { CardElDateTimeCom } from './card-el-date-time.component';
import { CardElTitleCom } from './card-el-title.component';
import { CardElScoreCom } from './card-el-score.component';

@NgModule({
  declarations: [
    GameCardBaseCom,
    GameCardFullCom,
    CardElButtonsCom,
    CardElClubNameCom,
    CardElDateTimeCom,
    CardElTitleCom,
    GameCardPreviousCom,
    CardElScoreCom
  ],
  imports: [
    IonicModule,
    LoadingImgModule,
    UIBlocksModule,
    GamesBannerModule
  ],
  exports:[
    GameCardFullCom,
    GameCardPreviousCom
  ]
})
export class GameCardModule {}
