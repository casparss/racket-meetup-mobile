import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsController } from './tabs/tabs-controller.component';
import { WelcomeCom } from './modules/welcome/welcome.component'

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav><toast></toast>`
})
export class RacketMeetupApp {
  rootPage = WelcomeCom;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
