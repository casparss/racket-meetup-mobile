import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';

import { GamesBannerUtils } from './games-banner.utils';
import { GamesBannerCom, ScoreLineCom } from './games-banner.component';

@NgModule({
  declarations: [
    GamesBannerCom,
    ScoreLineCom
  ],
  imports: [
    IonicModule,
    LoadingImgModule
  ],
  exports: [
    GamesBannerCom
  ],
  providers: [
    GamesBannerUtils
  ]
})
export class GamesBannerModule {}
