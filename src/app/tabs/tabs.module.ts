import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';

//Tabs
import {CourtsTab} from './tab-courts.component';
import {GamesTab} from './tab-games.component';
import {MessagesTab} from './tab-messages.component';
import {ProfileTab} from './tab-profile.component';
import {RankingsTab} from './tab-rankings.component';
import {TabsController} from './tabs-controller.component';

//@TODO: Messages Needs to be turned into module and imported here
import {MessageListCom} from '../modules/messages/message-list.component';

//Imports
import {ProfileModule} from '../modules/profile-main';
import {RankingsModule} from '../modules/rankings-list';


@NgModule({
  declarations: [
    CourtsTab,
    CourtsTab,
    GamesTab,
    MessagesTab,
    ProfileTab,
    RankingsTab,
    TabsController,

    MessageListCom
  ],
  imports: [
    IonicModule,
    ProfileModule,
    RankingsModule
  ],
  exports: [TabsController]
})
export class TabsModule {}
