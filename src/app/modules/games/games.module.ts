import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';

import { GamesCom } from './games.component';
import { GamesListCom } from './games-list.component';

@NgModule({
  declarations: [GamesCom, GamesListCom],
  imports: [IonicModule, LoadingImgModule],
  exports:[GamesCom]
})
export class GamesModule {}
