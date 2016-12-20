import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

//App import
import { RacketMeetupApp } from './app.component';

//Tabs imports
import {TabsPageCom} from './tabs';
import {CourtsTab} from './tabs-games.component';
import {GamesTab} from './tabs-games.component';
import {MessagesTab} from './tabs-messages.component';
import {ProfileTab} from './tabs-profile.component';
import {RankingsTab} from './tabs-rankings.component';

//Sub component imports
import {ProfileMainCom} from '../../modules/profile-main/profile-main.component';
import {AvailabilityCom} from '../../modules/availability/availability.component.ts'
import {GamesCom} from '../../modules/games/games.component.ts';
import {ToastCom} from '../toast/toast.component';
import {RankingListCom} from '../../modules/rankings-list/rankings-list.component.ts';
import {MessageListCom} from '../../modules/messages/message-list.component.ts';

//Angular2 services
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

//Services
import {ColObjDifferFactory} from './utils/differs/collection-object-diff.ts';
import {UserSvc} from './modules/user-service/user.service';
import {DecHttp} from './utils/http/';
import {ToastSvc} from './modules/toast/toast.service';
import {WsSvc} from './modules/web-sockets-service/web-sockets-service';

@NgModule({
  declarations: [

    //Main app
    RacketMeetupApp,

    //Tabs imports
    TabsPageCom,
    CourtsTab,
    GamesTab,
    MessagesTab,
    ProfileTab,
    RankingsTab,

    //Sub component imports
    ProfileMainCom,
    AvailabilityCom,
    GamesCom,
    ToastCom,
    MessageListCom

  ],
  imports: [
    IonicModule.forRoot(RacketMeetupApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RacketMeetupApp,
    TabsPageCom,
    CourtsTab,
    GamesTab,
    MessagesTab,
    ProfileTab,
    RankingsTab
  ],
  providers: [
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
