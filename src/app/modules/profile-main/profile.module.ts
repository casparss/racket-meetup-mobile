import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';

import {ProfileActionsCom} from './profile-actions.component'
import {AvailabilityModule} from '../availability/availability.module';
import {ProfileHeaderCom} from './profile-header.component';
import {ProfileMainSvc} from './profile-main.service';
import {ProfileMainCom} from './profile-main.component';
import {UserSvc} from '../user-service/user.service';
import {GamesModule} from '../games/games.module';

import {MydetailsCom} from '../my-details/my-details.component';
import {FollowersCom} from '../followers/followers.component';
import {SearchPlayersCom} from '../followers/search-players.component';

@NgModule({
  declarations: [
    ProfileMainCom,
    ProfileActionsCom,
    ProfileHeaderCom,
    MydetailsCom,
    FollowersCom,
    SearchPlayersCom
  ],
  imports: [
    IonicModule,
    AvailabilityModule,
    GamesModule
  ],
  entryComponents: [
    MydetailsCom,
    FollowersCom,
    SearchPlayersCom
  ],
  exports: [
    ProfileMainCom
  ],
  providers: [ProfileMainSvc]
})
export class ProfileModule {}
