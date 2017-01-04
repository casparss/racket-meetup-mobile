import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';

//App import
import { RacketMeetupApp } from './app.component';

//Tabs imports
import {TabsController} from './tabs/tabs-controller.component';
import {CourtsTab} from './tabs/tab-courts.component';
import {GamesTab} from './tabs/tab-games.component';
import {MessagesTab} from './tabs/tab-messages.component';
import {ProfileTab} from './tabs/tab-profile.component';
import {RankingsTab} from './tabs/tab-rankings.component';

//Module imports
import {TabsModule} from './tabs/tabs.module';
import {MydetailsModule} from './modules/my-details/my-details.module';
import {FollowersModule} from './modules/followers/followers.module';
import {RankingsModule} from './modules/rankings-list/rankings.module';
import {ProfileModule} from './modules/profile-main/profile.module';
import {AvailabilityModule} from './modules/availability/availability.module';
import {WelcomeModule} from './modules/welcome/welcome.module';
import {GamesModule} from './modules/games/games.module';

//Welcome
import {WelcomeCom} from './modules/welcome/welcome.component'

//Sub component imports
import {ToastCom} from './modules/toast/toast.component';
import {GamesCom} from './modules/games/games.component';
import {RankingsListCom} from './modules/rankings-list/rankings-list.component';
import {MessageListCom} from './modules/messages/message-list.component';
import {ProfileMainCom} from './modules/profile-main/profile-main.component';
import {MydetailsCom} from './modules/my-details/my-details.component';
import {FollowersCom} from './modules/followers/followers.component';
import {ChallengeCom} from './modules/games/challenge.component';

//Angular2 services
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

//Services
import {ColObjDifferFactory} from './utils/differs/collection-object-diff.ts';
import {UserSvc} from './modules/user-service/user.service';
import {DecHttp} from './utils/http/';
import {ToastSvc} from './modules/toast/toast.service';
import {WsSvc} from './modules/web-sockets-service/web-sockets.service';

@NgModule({
  declarations: [

    //Main app
    RacketMeetupApp,

    //Tabs imports
    TabsController,
    CourtsTab,
    GamesTab,
    MessagesTab,
    ProfileTab,
    RankingsTab,

    //Sub component imports
    MessageListCom,
    ToastCom

  ],
  imports: [
    ProfileModule,
    RankingsModule,
    WelcomeModule,
    MydetailsModule,
    FollowersModule,
    GamesModule,
    IonicModule.forRoot(RacketMeetupApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RacketMeetupApp,
    TabsController,
    CourtsTab,
    GamesTab,
    MessagesTab,
    ProfileTab,
    RankingsTab,
    WelcomeCom,
    ToastCom,
    MydetailsCom,
    FollowersCom,
    ChallengeCom,
    GamesCom
  ],
  providers: [
    NavController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FormsModule,
  	HttpModule,
  	ToastSvc,
  	WsSvc,
  	DecHttp,
  	UserSvc,
  	WsSvc,
  	ColObjDifferFactory
  ]
})
export class AppModule {}
