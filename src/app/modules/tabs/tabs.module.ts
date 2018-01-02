import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

//Imports
import { ProfileModule } from '../profile-main';
import { ProfileMenuModule } from '../profile-menu';
import { RankingsModule } from '../rankings-list';
import { MessagesModule } from '../messages';

import { TabsController } from './tabs-controller.component';

@NgModule({
  declarations: [
    TabsController
  ],
  entryComponents: [TabsController],
  imports: [
    IonicModule,
    ProfileModule,
    RankingsModule,
    MessagesModule,
    ProfileMenuModule
  ],
  exports: [TabsController]
})
export class TabsModule {}
