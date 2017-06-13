import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FollowersCom } from './followers.component';
import { SearchPlayersCom } from '../followers/search-players.component';
import { LoadingImgModule } from '../../utils/loading-img';

@NgModule({
  declarations: [FollowersCom, SearchPlayersCom],
  imports: [IonicModule, LoadingImgModule],
  exports: [FollowersCom, SearchPlayersCom],
  entryComponents: [FollowersCom, SearchPlayersCom]
})
export class FollowersModule {}
