import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { GamesCom } from './games.component';
import { GamesListCom } from './games-list.component';

@NgModule({
  declarations: [GamesCom, GamesListCom],
  imports: [IonicModule],
  exports:[GamesCom]
})
export class GamesModule {}
