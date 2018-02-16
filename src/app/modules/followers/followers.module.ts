import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FollowersCom } from './followers.component';
import { SearchPlayersCom } from '../followers/search-players.component';
import { LoadingImgModule } from '../../utils/loading-img';
import { FollowersSvc } from './followers.service';
import { NoDataMessageModule } from '../no-data-message/no-data-message.module';
import { PlayerListModule } from '../player-list';

@NgModule({
  declarations: [FollowersCom, SearchPlayersCom],
  imports: [IonicModule, LoadingImgModule, NoDataMessageModule, PlayerListModule],
  exports: [FollowersCom, SearchPlayersCom],
  entryComponents: [FollowersCom, SearchPlayersCom],
  providers: [FollowersSvc]
})
export class FollowersModule {}
