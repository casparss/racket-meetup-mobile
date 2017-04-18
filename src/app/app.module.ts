//A2 deps
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';

//App import
import { RacketMeetupApp } from './app.component';

//Tabs imports
import {TabsModule} from './tabs/tabs.module';

//Tabs controller
import {TabsController} from './tabs/tabs-controller.component';

//Welcome module
import {WelcomeModule} from './modules/welcome/welcome.module';

//Welcome
import {WelcomeCom} from './modules/welcome/welcome.component';

//Toast component
import {ToastCom} from './modules/toast/toast.component';

//Angular2 services
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

//Services
import {ColObjDifferFactory} from './utils/differs/collection-object-diff.ts';
import {UserSvc} from './modules/user-service/user.service';
import {DecHttp} from './utils/http/';
import {ToastSvc} from './modules/toast/toast.service';
import {WsSvc} from './modules/web-sockets-service/web-sockets.service';
import {MessagesSvc} from './modules/messages/messages.service';

@NgModule({
  declarations: [RacketMeetupApp, ToastCom],
  imports: [
    TabsModule,
    WelcomeModule,
    IonicModule.forRoot(RacketMeetupApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RacketMeetupApp,
    TabsController,
    WelcomeCom,
    ToastCom
  ],
  providers: [
    NavController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FormsModule,
  	HttpModule,
  	ToastSvc,
  	WsSvc,
  	DecHttp,
  	UserSvc,
  	WsSvc,
  	ColObjDifferFactory,
    MessagesSvc
  ]
})
export class AppModule {}
