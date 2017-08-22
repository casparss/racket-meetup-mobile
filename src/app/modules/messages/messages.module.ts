import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChatModule } from '../chat';
import { MessageListCom } from './message-list.component';
import { LoadingImgModule } from '../../utils/loading-img';
import { FollowersModule } from '../followers';
import { NoDataMessageModule } from '../no-data-message/no-data-message.module';

@NgModule({
  declarations: [MessageListCom],
  imports: [IonicModule, LoadingImgModule, FollowersModule, NoDataMessageModule],
  entryComponents: [MessageListCom],
  exports: [MessageListCom]
})
export class MessagesModule {}
