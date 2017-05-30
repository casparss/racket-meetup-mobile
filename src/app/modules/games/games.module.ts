import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { GamesCom } from './games.component';
import { GamesListCom } from './games-list.component';
import { GamesSvc } from './games.service';

@NgModule({
  declarations: [GamesCom, GamesListCom],
  imports: [IonicModule],
  exports:[GamesCom],
  providers: [GamesSvc]
})
export class GamesModule {}
