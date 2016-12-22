import {NgModule} from '@angular/core';
import {CourtsTab} from './tab-courts.component';
import {GamesTab} from './tab-games.component';
import {MessagesTab} from './tab-messages.component';
import {ProfileTab} from './tab-profile.component';
import {RankingsTab} from './tab-rankings.component';
import {TabsController} from './tabs-controller.component';


@NgModule({
  declarations: [
    CourtsTab,
    CourtsTab,
    GamesTab,
    MessagesTab,
    ProfileTab,
    RankingsTab,
    TabsController
  ],
  exports:[TabsController]
})
export class TabsModule {}
