import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {FollowersCom} from './followers.component';
import {SearchPlayersCom} from '../followers/search-players.component'


@NgModule({
  declarations: [FollowersCom, SearchPlayersCom],
  imports: [
    IonicModule.forRoot(FollowersCom),
    IonicModule.forRoot(SearchPlayersCom)
  ],
  exports:[FollowersCom, SearchPlayersCom]
})
export class FollowersModule {}
