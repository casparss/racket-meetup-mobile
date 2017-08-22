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

import { WelcomeModule } from './modules/welcome/welcome.module';

//Angular2 services
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

//Services
import { ColObjDifferFactory } from './utils/differs/collection-object-diff.ts';
import { UserSvc } from './modules/user-service/user.service';
import { UserUtils } from './modules/user-service/user.utils';
import { UserModelSvc } from './modules/user-service/user.model.service';
import { GamesSvc } from './modules/games/games.service';
import { DecHttp } from './utils/http/';
import { ToastSvc } from './modules/toast/toast.service';
import { WsSvc } from './modules/web-sockets-service/web-sockets.service';
import { ConfigSvc } from './modules/config/config.service';

//imports
import { ModelSvcModule } from './modules/model-service/model-service.module'

@NgModule({
  declarations: [RacketMeetupApp],
  imports: [
    IonicStorageModule.forRoot(),
    ModelSvcModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    TabsModule,
    WelcomeModule,
    IonicModule.forRoot(RacketMeetupApp)
  ],
  bootstrap: [IonicApp],
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
    UserModelSvc,
    GamesSvc,
    ConfigSvc,
  	WsSvc,
  	ColObjDifferFactory,
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
