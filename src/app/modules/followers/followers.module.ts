import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FollowersCom } from './followers.component';
import { SearchPlayersCom } from '../followers/search-players.component';
import { LoadingImgModule } from '../../utils/loading-img';
import { FollowersSvc } from './followers.service';

@NgModule({
  declarations: [FollowersCom, SearchPlayersCom],
  imports: [IonicModule, LoadingImgModule],
  exports: [FollowersCom, SearchPlayersCom],
  entryComponents: [FollowersCom, SearchPlayersCom],
  providers: [FollowersSvc]
})
export class FollowersModule {}
