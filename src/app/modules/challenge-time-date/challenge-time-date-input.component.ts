import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UserInt } from '../user-service/user.interface';
import { UserModel } from '../user-service/user.model';
import { ChallengeTimeDateCom } from './challenge-time-date.component';

@Component({
  selector: 'challenge-time-date-input',
  template: `
    <ion-item>
      <ion-icon name="calendar" item-left></ion-icon>
        <span *ngIf="!this.value" class="label">Date and time</span>
        <span *ngIf="this.value" class="value">{{this.value.format("Mo MMM YYYY - HH:mm")}}</span>
      <button item-right (click)="openDateTime()" ion-button type="button">
        {{value ? 'Change' : 'Select'}}
      </button>
    </ion-item>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChallengeTimeDateInputCom),
      multi: true
    }
  ]
})
export class ChallengeTimeDateInputCom implements ControlValueAccessor {

  private value: any;
  private propagateChange = (_: any) => {};

  @Input() challenger: UserModel;
  @Input() challengee: UserModel;

  constructor(private modalController: ModalController){}

  writeValue(value: any){
    if(value !== undefined) this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = value => fn(this.value = value)
  }

  registerOnTouched() {}

  openDateTime(){
		let dateTimeModal = this.modalController.create(ChallengeTimeDateCom, {
			challenger: this.challenger,
			challengee: this.challengee
		});

		dateTimeModal.onDidDismiss(data => {
      if(data) this.propagateChange(data);
    });

		dateTimeModal.present();
	}

}
