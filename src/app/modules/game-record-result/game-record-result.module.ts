import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GameRecordResultCom } from './game-record-result.component';
import { WimbledonScoreboardCom } from './wimbledown-scoreboard.component';
import { ScoreItemCom } from './score-item.component';

@NgModule({
  imports: [IonicModule],
  declarations: [GameRecordResultCom, WimbledonScoreboardCom, ScoreItemCom],
  entryComponents: [GameRecordResultCom]
})
export class GameRecordResultModule {}
