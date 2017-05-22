import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';

import {AvailabilityModule} from '../availability/availability.module';
import {GamesModule} from '../games/games.module';
import {MessagesModule} from '../messages';
import {MydetailsModule} from '../my-details/my-details.module';

import {ChatCom} from '../messages/chat.component';
import {ProfileActionsCom} from './profile-actions.component'
import {ProfileHeaderCom} from './profile-header.component';
import {ProfileMainSvc} from './profile-main.service';
import {ProfileMainCom} from './profile-main.component';
import {MydetailsCom} from '../my-details/my-details.component';
import {FollowersCom} from '../followers/followers.component';
import {SearchPlayersCom} from '../followers/search-players.component';
import {ChallengeCom} from '../games/challenge.component';
import {UserSvc} from '../user-service/user.service';


@NgModule({
  declarations: [
    ProfileMainCom,
    ProfileActionsCom,
    ProfileHeaderCom,
    FollowersCom,
    SearchPlayersCom
  ],
  imports: [
    IonicModule,
    AvailabilityModule,
    GamesModule,
    MessagesModule,
    MydetailsModule
  ],
  entryComponents: [
    MydetailsCom,
    FollowersCom,
    SearchPlayersCom,
    ProfileMainCom,
    ChatCom,
    ChallengeCom
  ],
  exports: [
    ProfileMainCom
  ],
  providers: [ProfileMainSvc]
})
export class ProfileModule {}
