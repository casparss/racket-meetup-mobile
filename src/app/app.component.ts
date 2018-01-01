import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomeCom } from './modules/welcome/welcome.component';
import { PushSvc } from './modules/push-service/push.service';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class RacketMeetupApp {
  public rootPage = WelcomeCom;
  private platform: Platform;
  private splash: SplashScreen;
  private status: StatusBar;

  constructor(
    platform: Platform,
    splash: SplashScreen,
    status: StatusBar,
    pushSvc: PushSvc
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      !status || status.overlaysWebView(false);
      !status || status.backgroundColorByHexString('#2ebfa3');
      !splash || splash.hide();
      setTimeout(() => pushSvc.init(), 1000); //this sucks and is a hack obviously

    });
  }

}
