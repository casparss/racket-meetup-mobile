import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ChatCom } from './chat.component';
import { ChatSvc } from './chat.service';
import { MessageListCom } from './message-list.component';
import { MessagesSvc } from './messages.service';
import { LoadingImgModule } from '../../utils/loading-img';


@NgModule({
  declarations: [ChatCom, MessageListCom],
  imports: [IonicModule, LoadingImgModule],
  exports: [MessageListCom],
  providers: [ChatSvc, MessagesSvc]
})
export class MessagesModule {}
