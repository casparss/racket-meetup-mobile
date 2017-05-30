import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {ChallengeCom} from './challenge.component';
import {GamesCom} from './games.component';
import {GamesListCom} from './games-list.component';
import {GamesSvc} from './games.service';

@NgModule({
  declarations: [ChallengeCom, GamesCom, GamesListCom],
  imports: [IonicModule],
  exports:[ChallengeCom, GamesCom],
  providers: [GamesSvc]
})
export class GamesModule {}
