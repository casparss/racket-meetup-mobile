import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';

//Tabs
import {CourtsTab} from './tab-courts.component';
import {GamesTab} from './tab-games.component';
import {MessagesTab} from './tab-messages.component';
import {ProfileTab} from './tab-profile.component';
import {RankingsTab} from './tab-rankings.component';
import {TabsController} from './tabs-controller.component';

//Imports
import {ProfileModule} from '../modules/profile-main';
import {RankingsModule} from '../modules/rankings-list';
import {MessagesModule} from '../modules/messages';


@NgModule({
  declarations: [
    CourtsTab,
    GamesTab,
    MessagesTab,
    ProfileTab,
    RankingsTab,
    TabsController
  ],
  entryComponents: [
    CourtsTab,
    GamesTab,
    MessagesTab,
    ProfileTab,
    RankingsTab,
  ],
  imports: [
    IonicModule,
    ProfileModule,
    RankingsModule,
    MessagesModule
  ],
  exports: [TabsController]
})
export class TabsModule {}
