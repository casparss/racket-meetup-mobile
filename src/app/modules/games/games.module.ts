import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {ChallengeCom} from './challenge.component';
import {GamesCom} from './games.component';
import {GamesSvc} from './games.service';

@NgModule({
  declarations: [ChallengeCom, GamesCom],
  imports: [
    IonicModule.forRoot(ChallengeCom),
    IonicModule.forRoot(GamesCom)
  ],
  exports:[ChallengeCom, GamesCom],
  providers: [GamesSvc]
})
export class GamesModule {}
