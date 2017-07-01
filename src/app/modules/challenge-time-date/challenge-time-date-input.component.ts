import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UserInt } from '../user-service/user.interface';
import { ChallengeTimeDateCom } from './challenge-time-date.component';

@Component({
  selector: 'challenge-time-date-input',
  template: `
    <ion-item>
      <ion-icon name="calendar" item-left></ion-icon>
        <span *ngIf="!this.value" class="label">Date</span>
        <span *ngIf="this.value" class="value">{{this.value}}</span>
      <button item-right (click)="openDateTime()" ion-button type="button">
        Change
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

  @Input() challenger$: Observable<UserInt>;;
  @Input() challengee$: Observable<UserInt>;;

  constructor(private modalController: ModalController){}

  writeValue(value: any){
    if(value !== undefined) this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  openDateTime(){
		let dateTimeModal = this.modalController.create(ChallengeTimeDateCom, {
			challenger$: this.challenger$,
			challengee$: this.challengee$
		});

		dateTimeModal.onDidDismiss(data => {
      if(data){
        this.value = data;
        this.propagateChange(this.value);
      }
    });

		dateTimeModal.present();
	}
}
