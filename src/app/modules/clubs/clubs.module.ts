import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClubsCom } from './clubs.component';
import { ClubCom } from './club.component';
import { LoadingImgModule } from '../../utils/loading-img';
import { UIBlocksModule } from '../ui-blocks';
import { GamesModule } from '../games/games.module';


@NgModule({
  imports: [IonicModule, LoadingImgModule, UIBlocksModule, GamesModule],
  declarations: [ClubsCom, ClubCom],
  entryComponents: [ClubsCom, ClubCom],
  providers: []
})
export class ClubsModule {}
