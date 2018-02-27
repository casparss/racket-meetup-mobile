import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClubsCom } from './clubs.component';
import { ClubCom } from './club.component';
import { ClubsMapCom } from './clubs-map.component';
import { MyClubsCom } from './clubs-my.component';
import { LocalClubsCom } from './clubs-local.component';
import { ClubPlayerListCom } from './club-player-list.component';
import { PlayerSummaryCom } from './player-summary.component';
import { ClubActionsCom } from './club-actions.component';
import { ClubHeaderCom } from './club-header.component';
import { ClubsUtils } from './clubs.utils';
import { ClubsSvc } from './clubs.service';

import { LoadingImgModule } from '../../utils/loading-img';
import { UIBlocksModule } from '../ui-blocks';
import { NoDataMessageModule } from '../no-data-message/no-data-message.module';
import { GamesModule } from '../games';
import { RankingsModule } from '../rankings';
import { PlayerListModule } from '../player-list';

@NgModule({
  imports: [
    IonicModule,
    LoadingImgModule,
    UIBlocksModule,
    GamesModule,
    RankingsModule,
    PlayerListModule,
    NoDataMessageModule,
  ],
  declarations: [
    ClubsCom,
    ClubCom,
    ClubsMapCom,
    LocalClubsCom,
    MyClubsCom,
    ClubPlayerListCom,
    PlayerSummaryCom,
    ClubActionsCom,
    ClubHeaderCom
  ],
  entryComponents: [ClubsCom, ClubCom, ClubPlayerListCom],
  providers: [ClubsSvc, ClubsUtils]
})
export class ClubsModule {}
