//A2 deps
import { Crop } from '@ionic-native/crop';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { ActionSheet } from '@ionic-native/action-sheet';
import { Keyboard } from '@ionic-native/keyboard';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//App import
import { RacketMeetupApp } from './app.component';

//Tabs imports
import {TabsModule} from './modules/tabs/tabs.module';

//Tabs controller
import {TabsController} from './modules/tabs/tabs-controller.component';

//Welcome module
import { WelcomeModule } from './modules/welcome/welcome.module';
import { RankingsListCom } from './modules/rankings-list/rankings-list.component';
import { MessageListCom } from './modules/messages/message-list.component';

//Welcome
import { WelcomeCom } from './modules/welcome/welcome.component';
import { ToastCom } from './modules/toast/toast.component';

//Angular2 services
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Services
import { ColObjDifferFactory } from './utils/differs/collection-object-diff.ts';
import { UserSvc } from './modules/user-service/user.service';
import { UserUtils } from './modules/user-service/user.utils';
import { ModelSvc } from './modules/model-service/model.service';
import { UserModelSvc } from './modules/user-service/user.model.service';
import { GamesSvc } from './modules/games/games.service';
import { DecHttp } from './utils/http/';
import { ToastSvc } from './modules/toast/toast.service';
import { WsSvc } from './modules/web-sockets-service/web-sockets.service';
import { MessagesSvc } from './modules/messages/messages.service';
import { ConfigSvc } from './modules/config/config.service';

@NgModule({
  declarations: [RacketMeetupApp, ToastCom],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    TabsModule,
    WelcomeModule,
    IonicModule.forRoot(RacketMeetupApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RacketMeetupApp,
    TabsController,
    WelcomeCom,
    ToastCom,
    RankingsListCom,
    MessageListCom
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NavController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  	ToastSvc,
  	WsSvc,
  	DecHttp,
  	UserSvc,
    UserUtils,
    ModelSvc,
    UserModelSvc,
    GamesSvc,
    ConfigSvc,
  	WsSvc,
  	ColObjDifferFactory,
    MessagesSvc,
    Keyboard,
    SpinnerDialog,
    ActionSheet,
    Camera,
    Transfer,
    File,
    Crop
  ]
})
export class AppModule {}
