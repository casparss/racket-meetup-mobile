import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {FollowersCom} from './followers.component';
import {SearchPlayersCom} from '../followers/search-players.component'


@NgModule({
  declarations: [FollowersCom, SearchPlayersCom],
  imports: [IonicModule],
  exports:[FollowersCom, SearchPlayersCom]
})
export class FollowersModule {}
