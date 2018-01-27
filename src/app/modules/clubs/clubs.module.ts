import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NoDataMessageModule } from '../no-data-message/no-data-message.module';
import { ClubsCom } from './clubs.component';
import { ClubCom } from './club.component';
import { ClubsMapCom } from './clubs-map.component';
import { MyClubsCom } from './clubs-my.component';
import { LocalClubsCom } from './clubs-local.component';
import { ClubsUtils } from './clubs.utils';
import { ClubsSvc } from './clubs.service';
import { LoadingImgModule } from '../../utils/loading-img';
import { UIBlocksModule } from '../ui-blocks';
import { GamesModule } from '../games/games.module';

@NgModule({
  imports: [IonicModule, LoadingImgModule, UIBlocksModule, GamesModule, NoDataMessageModule],
  declarations: [ClubsCom, ClubCom, ClubsMapCom, LocalClubsCom, MyClubsCom],
  entryComponents: [ClubsCom, ClubCom],
  providers: [ClubsSvc, ClubsUtils]
})
export class ClubsModule {}
