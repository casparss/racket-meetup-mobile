import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { AvailabilityModule } from '../availability/availability.module';
import { GamesModule } from '../games/games.module';
import { MessagesModule } from '../messages';
import { MydetailsModule } from '../my-details/my-details.module';
import { LoadingImgModule } from '../../utils/loading-img';
import { ChallengeModule } from '../challenge';
import { FollowersModule } from '../followers'

import { ChatCom } from '../messages/chat.component';
import { ProfileActionsCom } from './profile-actions.component'
import { ProfileHeaderCom } from './profile-header.component';
import { ProfileMainCom } from './profile-main.component';
import { MydetailsCom } from '../my-details/my-details.component';

@NgModule({
  declarations: [
    ProfileMainCom,
    ProfileActionsCom,
    ProfileHeaderCom
  ],
  imports: [
    IonicModule,
    AvailabilityModule,
    GamesModule,
    MessagesModule,
    MydetailsModule,
    LoadingImgModule,
    ChallengeModule,
    FollowersModule
  ],
  entryComponents: [
    MydetailsCom,
    ProfileMainCom,
    ChatCom
  ],
  exports: [
    ProfileMainCom
  ]
})
export class ProfileModule {}
