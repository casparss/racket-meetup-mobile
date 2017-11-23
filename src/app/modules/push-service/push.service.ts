import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { BaseService } from '../../utils/base/base.service';
import { DecHttp, HttpUtils } from '../../utils/http';
import { ConfigSvc } from '../config/config.service';

const options: PushOptions = {
  android: {},
  ios: {
    alert: true,
    badge: true,
    sound: true
  },
  windows: {},
  browser: {
    pushServiceURL: 'gateway.sandbox.push.apple.com'
  }
};

@Injectable()
export class PushSvc extends BaseService {
  public reg: any;
  public $: PushObject;
  private user: any;
  private registrationId: string;

  constructor(
    private push: Push,
    configSvc: ConfigSvc,
    http: DecHttp
  ) {
    super(http, configSvc)
  }

  init() {
    this.$ = this.push.init(options);
    this.checkPermissions();
    this.setEvents();
  }

  setUser(user) {
    this.user = user;
    this.register();
  }

  register() {
    if(this.user && this.registrationId) {
      let data = { registrationId: this.registrationId };
      this._sync(data, {}, 'push')
        .subscribe()
    }
  }

  setEvents() {
    this.$
      .on('notification')
      .subscribe((notification: any) => console.log('Received a notification', notification));

    this.$
      .on('registration')
      .subscribe((registration: any) => {
        this.registrationId = registration.registrationId
        this.register();
        console.log('Device registered', registration)
      });

    this.$
      .on('error')
      .subscribe(error => console.error('Error with Push plugin', error));
  }

  checkPermissions() {
    return this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });
  }
}
