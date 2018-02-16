import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingImgModule } from '../../utils/loading-img';
import { NoDataMessageModule } from '../no-data-message/no-data-message.module';

import { PlayerListCom } from './player-list.component';

@NgModule({
  declarations: [PlayerListCom],
  imports: [IonicModule, LoadingImgModule, NoDataMessageModule],
  exports: [PlayerListCom],
  entryComponents: [PlayerListCom],
})
export class PlayerListModule {}
