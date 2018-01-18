import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClubsCom } from './clubs.component';
import { ClubCom } from './club.component';
import { ClubsMapCom } from './clubs-map.component';
import { ClubsUtils } from './clubs.utils';
import { ClubsSvc } from './clubs.service';
import { LoadingImgModule } from '../../utils/loading-img';
import { UIBlocksModule } from '../ui-blocks';
import { GamesModule } from '../games/games.module';

@NgModule({
  imports: [IonicModule, LoadingImgModule, UIBlocksModule, GamesModule],
  declarations: [ClubsCom, ClubCom, ClubsMapCom],
  entryComponents: [ClubsCom, ClubCom],
  providers: [ClubsSvc, ClubsUtils]
})
export class ClubsModule {}
