import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChatModule } from '../chat';
import { MessageListCom } from './message-list.component';
import { MessagesSvc } from './messages.service';
import { LoadingImgModule } from '../../utils/loading-img';


@NgModule({
  declarations: [MessageListCom],
  imports: [IonicModule, LoadingImgModule],
  exports: [MessageListCom],
  providers: [MessagesSvc]
})
export class MessagesModule {}
