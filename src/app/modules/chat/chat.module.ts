import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ChatCom } from './chat.component';
import { ChatSvc } from './chat.service';
import { LoadingImgModule } from '../../utils/loading-img';


@NgModule({
  declarations: [ChatCom],
  imports: [IonicModule, LoadingImgModule],
  exports: [ChatCom],
  providers: [ChatSvc],
  entryComponents: [ChatCom]
})
export class ChatModule {}
