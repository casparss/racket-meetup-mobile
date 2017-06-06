import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';

import { GamesCom } from './games.component';
import { GameCardCom } from './game-card.component';

@NgModule({
  declarations: [GamesCom, GameCardCom],
  imports: [IonicModule, LoadingImgModule],
  exports:[GamesCom]
})
export class GamesModule {}
