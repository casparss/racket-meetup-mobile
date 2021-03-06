import { Component, ViewChild } from '@angular/core';
import { UserModel } from '../user-service/user.model';
import { ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChallengeTimeDateUtils } from './challenge-time-date.utils';
import { AvailabilityCom } from '../availability/availability.component';

@Component({
  selector: 'challenge-time-date',
	template: `
  <ion-header>
    <ion-navbar>
      <ion-title>
        Select date and time
      </ion-title>
      <ion-buttons end>
        <button small icon-only ion-button (click)="viewCtrl.dismiss()"><ion-icon name="close"></ion-icon></button>
      </ion-buttons>
    </ion-navbar>
  </ion-header>

  <ion-content>

    <form [formGroup]="selectDateAndTime" (ngSubmit)="select(selectDateAndTime.value, selectDateAndTime.valid)">

      <availability
        [user]="challenger"
        [user2]="challengee"
        [selectedDay]="selectDateAndTime.controls.day.value"
        [selectedPeriod]="selectDateAndTime.controls.period.value"
      ></availability>

      <ion-row class="top">
        <ion-col width-100>
          <ion-list-header class="component-header">
            Details
          </ion-list-header>

          <ion-list>

            <ion-item>
              <ion-label primary>Week:</ion-label>
              <ion-select interface="popover" formControlName="week" (ionChange)="setDaysInput()">
                <ion-option
                  *ngFor="let week of weeks; let i=index"
                  [value]="week.date"
                  [selected]='week.selected'>
                  {{week.label}}
                </ion-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label primary>Day:</ion-label>
              <ion-select interface="popover" formControlName="day" (click)="availabilityCom.clearAnimationState()">
                <ion-option
                  *ngFor="let day of days"
                  [value]="day.date"
                  [disabled]="day.disabled">{{day.label}}</ion-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label primary>Period:</ion-label>
              <ion-select interface="popover" formControlName="period" (ionChange)="reflectPeriodInTime()">
                <ion-option *ngFor="let period of periods; let i=index" [value]='period.name' [selected]='periods[0].name'>
                  {{period.name}}
                </ion-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label primary>Time:</ion-label>
              <ion-datetime formControlName="time"
                displayFormat="HH:mm"
                pickerFormat="HH:mm"
                [min]="timeMin"
                [max]="timeMax"
              ></ion-datetime>
            </ion-item>

            <ion-item>
              <button [disabled]="!selectDateAndTime.valid" ion-button icon-left large block type="submit">
                <ion-icon name="tennisball" ></ion-icon>
                Select
              </button>
            </ion-item>

          </ion-list>

        </ion-col>
      </ion-row>

    </form>

  </ion-content>
  `
})
export class ChallengeTimeDateCom {
  private weeks:any;
  private days:any;
  private timeMin: any;
  private timeMax: any;
  private selectDateAndTime: FormGroup;
  private challenger: UserModel;
  private challengee: UserModel;
  private periods: any;
  @ViewChild(AvailabilityCom) availabilityCom: AvailabilityCom

	constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private utils: ChallengeTimeDateUtils
  ){
    let { challenger, challengee } = viewCtrl.data;
    this.challenger = challenger;
		this.challengee = challengee;
    this.weeks = utils.weeks;
    this.periods = utils.periods;
    this.buildForm();
    this.setDaysInput();
  }

  setDaysInput(){
    this.days = this.utils.days(this.selectDateAndTime.controls.week.value);
  }

  buildForm(){
    this.selectDateAndTime = this.formBuilder.group({
      week: [this.weeks[0].date, [<any>Validators.required]],
  		day: ['', [<any>Validators.required]],
      period: ['', [<any>Validators.required]],
      time: ['', [<any>Validators.required]]
  	});
  }

  select(value, valid){
    if(valid)
      this.viewCtrl.dismiss(this.utils.generateDate(value));
  }

  reflectPeriodInTime(){
    let selectedPeriod = this.selectDateAndTime.controls.period.value;
    let { min, max } = this.periods.find(period => period.name === selectedPeriod).range;
    this.timeMin = min;
    this.timeMax = max;
  }

  clearTime(){
    this.selectDateAndTime.controls.time.patchValue(null);
  }
}
