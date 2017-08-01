import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ChatSvc } from './chat.service';
import { TextDialogueCom } from './text-dialogue.component';
import { ChatCom } from './chat.component';
import { LoadingImgModule } from '../../utils/loading-img';

@NgModule({
  declarations: [ChatCom, TextDialogueCom],
  imports: [IonicModule, LoadingImgModule],
  exports: [ChatCom],
  providers: [ChatSvc],
  entryComponents: [ChatCom]
})
export class ChatModule {}
