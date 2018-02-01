import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClubsCom } from './clubs.component';
import { ClubCom } from './club.component';
import { ClubsMapCom } from './clubs-map.component';
import { MyClubsCom } from './clubs-my.component';
import { LocalClubsCom } from './clubs-local.component';
import { ClubsUtils } from './clubs.utils';
import { ClubsSvc } from './clubs.service';

import { LoadingImgModule } from '../../utils/loading-img';
import { UIBlocksModule } from '../ui-blocks';
import { NoDataMessageModule } from '../no-data-message/no-data-message.module';
import { GamesModule } from '../games';
import { RankingsModule } from '../rankings-list';
import { FollowersModule } from '../followers';

@NgModule({
  imports: [
    IonicModule,
    LoadingImgModule,
    UIBlocksModule,
    GamesModule,
    RankingsModule,
    FollowersModule,
    NoDataMessageModule
  ],
  declarations: [ClubsCom, ClubCom, ClubsMapCom, LocalClubsCom, MyClubsCom],
  entryComponents: [ClubsCom, ClubCom],
  providers: [ClubsSvc, ClubsUtils]
})
export class ClubsModule {}
