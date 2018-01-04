import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { BaseService } from '../../utils/base/base.service';
import { DecHttp, HttpUtils } from '../../utils/http';
import { ConfigSvc } from '../config/config.service';
import { ToastSvc } from '../toast/toast.service';

const options: PushOptions = {
  android: {},
  ios: {
    alert: true,
    badge: true,
    sound: true
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
    http: DecHttp,
    private toastSvc: ToastSvc
  ) {
    super(http, configSvc)
  }

  init() {
    this.$ = this.push.init(options);
    this.checkPermissions();
  }

  setUser(user) {
    this.user = user;
    this.register();
  }

  register() {
    console.log('register', 'user', this.user)
    console.log('register', 'registrationId', this.registrationId)
    if(this.user && this.registrationId) {
      let data = { registrationId: this.registrationId };
      this._sync(data, {}, 'push')
        .subscribe((data) => {
          console.log('subscribe', data)
        })
    }
  }

  setEvents() {
    this.$
      .on('notification')
      .subscribe((notification: any) => {
        //@TODO: parse path prop and navigate to it
        //@TODO: parse data if need be
        this.toastSvc.showMessage(
          notification.message,
          notification.additionalduration,
          notification.position
        );
      });

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
          this.setEvents();
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });
  }
}
