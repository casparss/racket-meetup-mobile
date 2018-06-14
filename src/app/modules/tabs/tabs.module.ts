import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

//Imports
import { ProfileModule } from '../profile-main';
import { ProfileMenuModule } from '../profile-menu';
import { RankingsModule } from '../rankings';
import { MessagesModule } from '../messages';
import { ClubsModule } from '../clubs';

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
    ProfileMenuModule,
    ClubsModule
  ],
  exports: [TabsController],
  providers: []
})
export class TabsModule {}
