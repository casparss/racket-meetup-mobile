import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { BaseService } from '../../utils/base/base.service';
import { DecHttp } from '../../utils/http';
import { ConfigSvc } from '../config/config.service';
import { ToastSvc } from '../toast/toast.service';

const options: PushOptions = {
  ios: {
    alert: true,
    badge: true,
    sound: true
  },
  android: {
    senderID: '1014463543428'
  }
};

interface RegistrationInt {
  registrationId: string,
  registrationType: string
}

@Injectable()
export class PushSvc extends BaseService {
  public reg: any;
  public $: PushObject;
  private user: any;
  private registration: RegistrationInt;

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
    if(this.user && this.registration) {
      this._sync(this.registration, {}, 'push').subscribe()
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
        this.registration = registration
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
