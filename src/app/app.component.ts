import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomeCom } from './modules/welcome/welcome.component'

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav><toast></toast>`
})
export class RacketMeetupApp {
  public rootPage = WelcomeCom;
  private platform: Platform;
  private splash: SplashScreen;
  private status: StatusBar;

  constructor(platform: Platform, splash: SplashScreen, status: StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      !this.status || this.status.styleDefault();
      !this.splash || this.splash.hide();
    });
  }
}
