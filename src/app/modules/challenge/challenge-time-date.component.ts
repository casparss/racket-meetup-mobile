import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserInt } from '../user-service/user.interface';
import { UserSvc } from '../user-service/user.service';
import { GamesSvc } from '../games/games.service';
import { ChallengeTimeDateUtils } from './challenge-time-date.utils';

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

      <availability [user$]="challenger$" [user2$]="challengee$"></availability>

      <ion-row class="top">
        <ion-col width-100>
          <ion-list-header class="component-header">
            Details
          </ion-list-header>

          <ion-list>

            <ion-item>
              <ion-label primary>Week:</ion-label>
              <ion-icon name="calendar" item-left></ion-icon>
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
              <ion-icon name="calendar" item-left></ion-icon>
              <ion-select formControlName="day">
                <ion-option
                  *ngFor="let day of days"
                  [value]="day.date"
                  [disabled]="day.disabled">{{day.label}}</ion-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label primary>Period:</ion-label>
              <ion-icon name="time" item-left></ion-icon>
              <ion-select interface="popover" formControlName="week">
                <ion-option *ngFor="let period of periods; let i=index" [value]='period' [selected]='periods[0]'>
                  {{period}}
                </ion-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label primary>Time:</ion-label>
              <ion-icon name="time" item-left></ion-icon>
              <ion-datetime formControlName="time"
                displayFormat="DDD D MMM YYYY"
                pickerFormat="DDD D MMM YYYY"
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
export class ChallengeTimeDate {

  private periods = ['Morning', 'Afternoon', 'Evening'];

  private weeks:any;
  private days:any;
  private selectDateAndTime: FormGroup;
  private challenger$: Observable<UserInt>;
  private challengee$: Observable<UserInt>;

	constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private userSvc: UserSvc,
		private gamesSvc: GamesSvc,
    private utils: ChallengeTimeDateUtils
  ){
    let { challenger$, challengee$ } = viewCtrl.data;
    this.challenger$ = challenger$;
		this.challengee$ = challengee$;
    this.weeks = utils.weeks;
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
      period: [{ value:'', disabled: false }, [<any>Validators.required]],
      time: [{ value:'', disabled: false }, [<any>Validators.required]]
  	});
  }

  select(value, valid){
    if(valid) this.viewCtrl.dismiss(value);
  }

}
